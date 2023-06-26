import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Request from '../types/Request'
import { Tenant } from '../models/Tenant'
import TenantSchema from '../schemas/Tenant'

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const user = await Tenant.findById(id)

    res.status(StatusCodes.OK).json(user)
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err)
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = TenantSchema.validate(req.body)

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    return
  }

  const { name, email } = value

  const user = await Tenant.findOne({ _id: req.userId })

  user.name = name
  user.email = email

  await user.save()

  const token = user.createJwt()
  res.status(StatusCodes.OK).json({
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  })
}
