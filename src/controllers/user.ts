import { Response } from 'express'
import Joi from 'joi'
import Request from '../types/Request'
import { IUser } from '../models/User'
import UserSchema from '../schemas/User'

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = req.body as Partial<IUser>
    const { error } = UserSchema.validate(userData)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const newUser = await req.model.User.create(userData)
    res.json(newUser)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.model.User.find().lean()
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    } else {
      res.json(user)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id
    const { error } = Joi.string().required().validate(userId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const user = req.model.User.findById(userId).lean()
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    } else {
      res.json(user)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id
    const updatedData = req.body as Partial<IUser>
    const { error } = Joi.string().required().validate(userId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const updatedUser = req.model.User.findByIdAndUpdate(userId, updatedData, { new: true }).lean()
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' })
    } else {
      res.json(updatedUser)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id
    const { error } = Joi.string().required().validate(userId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const deletedUser = await req.model.User.findByIdAndDelete(userId).lean()
    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' })
    } else {
      res.json(deletedUser)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
