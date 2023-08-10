import { Document, Schema, Types } from 'mongoose'


export interface IVehicle {
  make: string
  model: string
  rego: string
  year: number
  odo: number
}
export interface IReport extends Document {
  title: string
  vehicle: IVehicle
  owner: string
  service: string[]
  createdAt: string
  attachments: string[]
  comments: string[]
}

export const ReportSchema = new Schema<IReport>({
  title: {
    type: String,
  },
  vehicle: {
    make: {
      type: String,
      required: [true, 'Please enter the make of the vehicle.'],
    },
    model: {
      type: String,
      required: [true, 'Please enter the model of the vehicle.'],
    },
    rego: {
      type: String,
      required: [true, 'Please enter the rego of the vehicle.'],
    },
    year: {
      type: Number,
      required: [true, 'Please enter the year of the vehicle.'],
    },

   odo: {
      type: Number,
      required: [true, 'Please enter the odometer of the vehicle.'],
    },
  },
  owner: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  service: {
    type: [String],
    required: [true, 'Please enter the service.'],
  },
  createdAt: {
    type: String,
  },
  attachments: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
})
