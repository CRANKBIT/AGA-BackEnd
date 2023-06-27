import { Router } from 'express'
import { getTenantById, updateTenant } from '../controllers/tenant'

const userRouter = Router()

userRouter.route('/:id').get(getTenantById).patch(updateTenant)

export default userRouter
