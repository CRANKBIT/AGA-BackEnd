import express from 'express'
import { createCompany, getMyCompanys, deleteCompanyById } from '../controllers/private/company'

const companyRouter = express.Router()

// Create a new company
companyRouter.post('/', createCompany)

// Get all companies
companyRouter.get('/', getMyCompanys)

// Delete a company by ID
companyRouter.delete('/:id', deleteCompanyById)

export default companyRouter
