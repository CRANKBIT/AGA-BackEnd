// routes/userRoutes.ts

import express from 'express'
import { sendInviteEmial, getMyUsers, deleteUserById } from '../controllers/user'

const userRouter = express.Router()

// Create a new user
userRouter.post('/:email', sendInviteEmial)

// Get all users
userRouter.get('/', getMyUsers)

// Delete a user by ID
userRouter.delete('/:id', deleteUserById)

export default userRouter
