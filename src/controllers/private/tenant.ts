import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Request from '../../types/Request'
import TenantSchema from '../../schemas/Tenant'

export const register = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = TenantSchema.validate(req.body)

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    return
  }

  const { name, email, password } = value

  const tenantExists = await req.model.Tenant.findOne({ email })
  if (tenantExists) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide another valid email address' })
    return
  }

  const tenant = await req.model.Tenant.create({ name, email, password })
  const token = tenant.createJwt()

  res.status(StatusCodes.CREATED).json({
    tenant: {
      tenantId: tenant._id,
      name: tenant.name,
      email: tenant.email,
    },
    token,
  })
}

export const login = async (req: Request, res: Response): Promise<void> => {
  if (req.headers.host.split('.')[0] !== 'www') {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid host' })
    return
  }
  const { error, value } = TenantSchema.validate(req.body)

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    return
  }

  const { email, password } = value

  const tenant = await req.model.Tenant.findOne({ email }).select('+password')
  if (!tenant) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' })
    return
  }

  const isPasswordCorrect = await tenant.comparePassword(password)
  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' })
    return
  }

  const token = tenant.createJwt()
  tenant.password = undefined

  res.status(StatusCodes.OK).json({
    tenant: {
      tenantId: tenant._id,
      name: tenant.name,
      email: tenant.email,
    },
    token,
  })
}

export const getTenantById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const tenant = await req.model.Tenant.findById(id)

    res.status(StatusCodes.OK).json(tenant)
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err)
  }
}

export const updateTenant = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = TenantSchema.validate(req.body)

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    return
  }

  const { name, email } = value
  console.log(TenantSchema.validate(req.body), 'this is value')

  const tenant = await req.model.Tenant.findOne({ _id: req.tenantId })
  console.log(tenant, 'this is tenant')
  tenant.name = name
  tenant.email = email

  await tenant.save()

  const token = tenant.createJwt()
  res.status(StatusCodes.OK).json({
    tenant: {
      tenantId: tenant._id,
      name: tenant.name,
      email: tenant.email,
    },
    token,
  })
}

export const checkLogin = async (req: Request, res: Response): Promise<void> => {
  res.json({ loggedIn: true })
}
