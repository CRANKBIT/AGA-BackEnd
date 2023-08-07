import { Router } from 'express'
import companyRouter from './company'
import tenantRouter from './tenant'
import reportRouter from './report'
import userRouter from './user'
import vehicleRouter from './vehicle'

import authenticateTenant from '../middleware/auth'
import privateMW from '../middleware/private'
import publicMW from '../middleware/public'
import s3Router from './s3'
import checkSubDomainRouter from './checkDomain'

const v1Router = Router()

v1Router
  .use('/company', privateMW, authenticateTenant, companyRouter)
  .use('/tenant', privateMW, tenantRouter)
  .use('/report', publicMW, reportRouter)
  .use('/user', publicMW, authenticateTenant, userRouter)
  .use('/vehicle', publicMW, authenticateTenant, vehicleRouter)
  .use('/s3', s3Router)
  .use('/checkSubDomain', checkSubDomainRouter)

export default v1Router
