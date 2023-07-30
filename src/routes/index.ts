import { Router } from 'express'
import tenantRouter from './tenant'
import authRouter from './auth'
import companyRouter from './company'
import userRouter from './user'
import vehicleRouter from './vehicle'
import authenticateTenant from '../middleware/auth'

const v1Router = Router()

v1Router
  .use('/auth', authRouter)
  .use('/tenant', authenticateTenant, tenantRouter)
  .use('/companies', authenticateTenant, companyRouter)
  .use('/user', authenticateTenant, userRouter)
  .use('/vehicle', vehicleRouter)

export default v1Router
