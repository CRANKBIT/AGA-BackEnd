import { Router } from 'express'
import { createCompany, getCompanyById } from '../controllers/private/company'

const companyRouter = Router()

companyRouter.route('/').post(createCompany)
companyRouter.route('/:id').get(getCompanyById)

export default companyRouter
