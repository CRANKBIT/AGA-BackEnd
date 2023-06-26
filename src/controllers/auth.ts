import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Tenant } from '../models/Tenant'
import UserSchema from '../schemas/Tenant'

export const register = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = UserSchema.validate(req.body)

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    return
  }

  const { name, email, password } = value

  const userExists = await Tenant.findOne({ email })
  if (userExists) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide another valid email address' })
  }

  const user = await Tenant.create({ name, email, password })
  const token = user.createJwt()
  res.status(StatusCodes.CREATED).json({
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  })
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = UserSchema.validate(req.body)

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    return
  }

  const { email, password } = value

  const user = await Tenant.findOne({ email }).select('+password')
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid credentials' })
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid credentials' })
  }

  const token = user.createJwt()
  user.password = undefined
  res.status(StatusCodes.OK).json({
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  })
}
