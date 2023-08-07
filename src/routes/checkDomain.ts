import express from 'express'
import checkSubDomain from '../controllers/public'

const checkSubDomainRouter = express.Router()

// Create a new user
checkSubDomainRouter.post('/', checkSubDomain)


export default checkSubDomainRouter
