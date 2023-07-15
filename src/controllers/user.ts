// Assuming you have the UserModel defined and imported from user.model.ts
import { Request, Response } from 'express'
import UserModel, { IUser } from '../models/User' // Make sure to import the IUser interface

// Helper function for basic email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  return emailRegex.test(email)
}

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, token } = req.body

    // Perform basic email validation before saving
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const newUser: IUser = new UserModel({ email, token })
    await newUser.save()

    return res.status(201).json(newUser)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users: IUser[] = await UserModel.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}

// Get a single user by ID
// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId: string = req.params.id

    const user: IUser | null = await UserModel.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Return the user when found
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}

// Update a user by ID
export const updateUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId: string = req.params.id
    const { email, token } = req.body

    // Perform basic email validation before updating
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(userId, { email, token }, { new: true })

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId: string = req.params.id

    const deletedUser: IUser | null = await UserModel.findByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}
