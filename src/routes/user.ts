// routes/userRoutes.ts

import express from 'express'
import { createUser, getUsers, getUserById, deleteUserById } from '../controllers/user'

const userRouter = express.Router()

// Create a new user
userRouter.post('/', createUser)

// Get all users
userRouter.get('/', getUsers)

// Get a single user by ID
userRouter.get('/:id', getUserById)

// Delete a user by ID
userRouter.delete('/:id', deleteUserById)

export default userRouter
