// routes/userRoutes.ts

import express from 'express'
import { createService, getService } from '../controllers/serviceItem'

const serviceItemRouter = express.Router()

// Create a new service
serviceItemRouter.post('/', createService)

// Get all services
serviceItemRouter.get('/', getService)


export default serviceItemRouter
