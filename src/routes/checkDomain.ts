import express from 'express'
import checkSubDomain from '../controllers/public'

const checkSubDomainRouter = express.Router()

// Create a new user
checkSubDomainRouter.get('/:domain', checkSubDomain)

export default checkSubDomainRouter
