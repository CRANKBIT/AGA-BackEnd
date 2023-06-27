import { Router } from 'express'
import { getTenantById, updateUser } from '../controllers/tenant'

const userRouter = Router()

userRouter.route('/:id').get(getTenantById).patch(updateUser)

export default userRouter
