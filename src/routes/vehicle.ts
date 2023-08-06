// routes/vehicleRoutes.ts

import express from 'express'
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
} from '../controllers/vehicle'

const vehicleRouter = express.Router()

// Create a new vehicle
vehicleRouter.post('/', createVehicle)

// Get all vehicles
vehicleRouter.get('/', getVehicles)

// Get a single vehicle by ID
vehicleRouter.get('/:id', getVehicleById)

// Update a vehicle by ID
vehicleRouter.put('/:id', updateVehicleById)

// Delete a vehicle by ID
vehicleRouter.delete('/:id', deleteVehicleById)

export default vehicleRouter
