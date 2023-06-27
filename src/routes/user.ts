import { Router } from 'express'
import { getUserById, updateUser } from '../controllers/tenant'

const userRouter = Router()

userRouter.route('/:id').get(getUserById).patch(updateUser)

export default userRouter
