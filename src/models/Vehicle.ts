import mongoose, { Document } from 'mongoose'

export interface IVehicle extends Document {
  ownerName: string
  rego: string
  vin: string
  odometer: string
}

export const VehicleSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: [true, 'please enter your name'],
    minlength: 3,
    maxlength: 50,
  },
  rego: {
    type: String,
    required: true,
    unique: true,
  },
  vin: {
    type: String,
    required: [true, 'please enter vehicle vehicle identification number'],
    minlength: 3,
    maxlength: 50,
  },
  odometer: {
    type: String,
    required: [false, 'please enter your odometer'],
  },
})
