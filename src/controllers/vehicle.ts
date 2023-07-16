import { Request, Response } from 'express'
import { IVehicle } from '../models/Vehicle'
import vehicleService from '../services/vehicleService'

export const createVehicleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicleData = req.body as Partial<IVehicle>
    const newVehicle = await vehicleService.createVehicle(vehicleData)
    res.status(201).json(newVehicle)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

export const getVehicleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicleId = req.params.id
    const getVehicle = await vehicleService.getVehicle(vehicleId)
    if (!getVehicle) {
      res.status(404).json({ error: 'Vehicle not found!' })
    } else {
      res.status(201).json(getVehicle)
    }
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

export const updateVehicleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicleData = req.body as Partial<IVehicle>
    const vehicleId = req.params.id
    const updateVehicle = await vehicleService.updateVehicle(vehicleId, vehicleData)
    if (!updateVehicle) {
      res.status(404).json({ error: 'Vehicle not update!' })
    } else {
      res.status(201).json(updateVehicle)
    }
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

export const deleteVehicleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicleId = req.params.id
    const deleteVehicle = await vehicleService.deleteVehicle(vehicleId)
    if (!deleteVehicle) {
      res.status(404).json({ error: 'Vehicle not delete!' })
    } else {
      res.status(201).json(deleteVehicle)
    }
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}
