import mongoose, { Document } from 'mongoose'

export interface IVehicle extends Document {
  ownerName: string
  rego: string
  vin: string
  odometer: string
}

const VehicleSchema = new mongoose.Schema({
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
    validate: {
      validator(value: string): Promise<boolean> {
        return mongoose.models.Vehicle.findOne({ rego: value })
          .then((vehicle) => !vehicle) // Ensure no other vehicle with the same rego exists
          .catch(() => false)
      },
      message: 'Rego already exists',
    },
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

export const Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema)
