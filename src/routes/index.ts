import { Router } from 'express'
import companyRouter from './company'
import tenantRouter from './tenant'
import reportRouter from './report'
import userRouter from './user'
import vehicleRouter from './vehicle'

import authenticateTenant from '../middleware/auth'
import privateMW from '../middleware/private'
import publicMW from '../middleware/public'

const v1Router = Router()

v1Router
  .use('/company', privateMW, authenticateTenant, companyRouter)
  .use('/tenant', privateMW, authenticateTenant, tenantRouter)
  .use('/report', publicMW, authenticateTenant, reportRouter)
  .use('/user', publicMW, authenticateTenant, userRouter)
  .use('/vehicle', publicMW, authenticateTenant, vehicleRouter)

export default v1Router
