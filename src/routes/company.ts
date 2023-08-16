import express from 'express'
import { createCompany, getMyCompanies, deleteCompanyByDomain } from '../controllers/private/company'

const companyRouter = express.Router()

// Create a new company
companyRouter.post('/', createCompany)

// Get all companies
companyRouter.get('/', getMyCompanies)

// Delete a company by Domain

companyRouter.delete('/:domain', deleteCompanyByDomain)

// companyRouter.delete('/:id', deleteCompanyById)

// companyRouter.get('/:domain', getCompanyIdByDomain)

export default companyRouter
