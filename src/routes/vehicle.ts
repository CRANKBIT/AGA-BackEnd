import express from 'express'
import {
  createVehicleController,
  getVehiclesController,
  getVehicleByIDController,
  updateVehicleController,
  deleteVehicleController,
} from '../controllers/vehicle'

const vehicleRouter = express.Router()

// Create a new vehicle
vehicleRouter.post('/', createVehicleController)

// Get all vehicles
vehicleRouter.get('/', getVehiclesController)

// Get a single vehicle by ID
vehicleRouter.get('/:id', getVehicleByIDController)

// Update a vehicle by ID
vehicleRouter.put('/:id', updateVehicleController)

// Delete a vehicle by ID
vehicleRouter.delete('/:id', deleteVehicleController)

export default vehicleRouter
