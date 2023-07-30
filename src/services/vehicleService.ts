import { LeanDocument } from 'mongoose'
import { IVehicle, Vehicle } from '../models/Vehicle'

const vehicleService = {
  createVehicle: async (vehicleData: Partial<IVehicle>): Promise<IVehicle> => {
    try {
      const newVehicle = await Vehicle.create(vehicleData)
      return newVehicle
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getVehicleByID: async (vehicleId: string): Promise<LeanDocument<IVehicle | null>> => {
    try {
      const vehicle = await Vehicle.findById(vehicleId).lean().exec()
      return vehicle
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getVehicles: async (): Promise<LeanDocument<IVehicle | null>> => {
    try {
      const vehicle = await Vehicle.find().lean().exec()
      return vehicle
    } catch (error) {
      throw new Error(error.message)
    }
  },

  updateVehicle: async (vehicleId: string, vehicleData: Partial<IVehicle>): Promise<LeanDocument<IVehicle | null>> => {
    try {
      const updateVehicle = await Vehicle.findByIdAndUpdate(vehicleId, vehicleData).lean().exec()
      return updateVehicle
    } catch (error) {
      throw new Error(error.message)
    }
  },

  deleteVehicle: async (vehicleId: string): Promise<LeanDocument<IVehicle | null>> => {
    try {
      const deleteVehicle = await Vehicle.findByIdAndRemove(vehicleId).lean().exec()
      return deleteVehicle
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

export default vehicleService
