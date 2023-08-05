import { Response } from 'express'
import Joi from 'joi'
import Request from '../types/Request'
import { IVehicle } from '../models/Vehicle'
import VehicleSchema from '../schemas/Vehicle'

export const createVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicleData = req.body as Partial<IVehicle>
    const { error } = VehicleSchema.validate(vehicleData)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const newVehicle = await req.model.Vehicle.create(vehicleData)
    res.json(newVehicle)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicle = req.model.Vehicle.find().lean()
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' })
    } else {
      res.json(vehicle)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicleId = req.params.id
    const { error } = Joi.string().required().validate(vehicleId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const vehicle = req.model.Vehicle.findById(vehicleId).lean()
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' })
    } else {
      res.json(vehicle)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicleId = req.params.id
    const updatedData = req.body as Partial<IVehicle>
    const { error } = Joi.string().required().validate(vehicleId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const updatedVehicle = req.model.Vehicle.findByIdAndUpdate(vehicleId, updatedData, { new: true }).lean()
    if (!updatedVehicle) {
      res.status(404).json({ error: 'Vehicle not found' })
    } else {
      res.json(updatedVehicle)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicleId = req.params.id
    const { error } = Joi.string().required().validate(vehicleId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const deletedVehicle = await req.model.Vehicle.findByIdAndDelete(vehicleId).lean()
    if (!deletedVehicle) {
      res.status(404).json({ error: 'Vehicle not found' })
    } else {
      res.json(deletedVehicle)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
