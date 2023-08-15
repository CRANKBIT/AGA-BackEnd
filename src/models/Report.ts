import { Document, Schema, Types } from 'mongoose'

export interface IReport extends Document {
  Year: string
  Make: string
  Model: string
  Rego: string
  Odometer: string
  CustomerName: string
  service: string[]
}

export const ReportSchema = new Schema<IReport>({
  Year: {
    type: String,
    required: [true, 'Please enter the make of the vehicle.'],
  },
  Make: {
    type: String,
    required: [true, 'Please enter the model of the vehicle.'],
  },
  Model: {
    type: String,
    required: [true, 'Please enter the rego of the vehicle.'],
  },
  Rego: {
    type: String,
    required: [true, 'Please enter the year of the vehicle.'],
  },

  Odometer: {
    type: String,
    required: [true, 'Please enter the odometer of the vehicle.'],
  },
  CustomerName: {
    type: String,
    required: [true, 'Please enter the owner name of the vehicle.'],
  },
  service: {
    type: [String],
    required: [true, 'Please enter the service.'],
  },
})
