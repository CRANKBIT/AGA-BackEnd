import { NextFunction, Request, Response } from 'express'
import UserModel, { IUser } from '../models/User'
import { handleServerError, handleNotFound } from '../middleware/errorHandler'

const ERROR_MESSAGES = {
  InvalidEmailFormat: 'Invalid email format',
  UserNotFound: 'User not found',
  ServerError: 'Server error',
}
// Helper function for basic email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  return emailRegex.test(email)
}
// Create a new user
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, token } = req.body
  // Perform basic email validation before saving
  if (!isValidEmail(email)) {
    res.status(400).json({ error: ERROR_MESSAGES.InvalidEmailFormat })
  }
  try {
    const newUser: IUser = new UserModel({ email, token })
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    handleServerError(error, req, res, next)
  }
}
// Get all users
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const users: IUser[] = await UserModel.find()
    res.status(200).json(users)
  } catch (error) {
    handleServerError(error, req, res, next)
  }
}
// Get a single user by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const userId: string = req.params.id

  try {
    const user: IUser = await UserModel.findById(userId)
    if (!user) {
      handleNotFound(ERROR_MESSAGES.UserNotFound, req, res, next)
    }
    res.status(200).json(user)
  } catch (error) {
    handleServerError(error, req, res, next)
  }
}
// Update a user by ID
export const updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const userId: string = req.params.id
  const { email, token } = req.body
  // Perform basic email validation before updating
  if (!isValidEmail(email)) {
    res.status(400).json({ error: ERROR_MESSAGES.InvalidEmailFormat })
  }
  try {
    const updatedUser: IUser = await UserModel.findByIdAndUpdate(userId, { email, token }, { new: true })

    if (!updatedUser) {
      handleNotFound(ERROR_MESSAGES.UserNotFound, req, res, next)
    }
    res.status(200).json(updatedUser)
  } catch (error) {
    handleServerError(error, req, res, next)
  }
}
// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const userId: string = req.params.id

  try {
    const deletedUser: IUser = await UserModel.findByIdAndDelete(userId)
    if (!deletedUser) {
      handleNotFound(ERROR_MESSAGES.UserNotFound, req, res, next)
    } else {
      res.status(200).json({ message: 'User deleted successfully' })
    }
  } catch (error) {
    handleServerError(error, req, res, next)
  }
}
