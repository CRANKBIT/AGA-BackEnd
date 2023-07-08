import { Router } from 'express'
import { getTenantById, updateTenant, isTenantLoggedIn } from '../controllers/tenant'

const tenantRouter = Router()

tenantRouter.route('/:id').get(getTenantById).patch(updateTenant)
tenantRouter.route('/is-logged-in').get(isTenantLoggedIn)
export default tenantRouter
