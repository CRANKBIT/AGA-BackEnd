import { Router } from 'express'
import tenantRouter from './tenant'
import authRouter from './auth'
import companyRouter from './company'
import reportRouter from './report'
import userRouter from './user'
import authenticateTenant from '../middleware/auth'

const v1Router = Router()

v1Router
  .use('/auth', authRouter)
  .use('/tenant', authenticateTenant, tenantRouter)
  .use('/companies', authenticateTenant, companyRouter)
  .use('/report', reportRouter)
  .use('/user', userRouter)

export default v1Router
