import mongoose, { Document } from 'mongoose'
import { IUser } from './User'

export interface ICompany extends Document {
  name: string
}

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your company'],
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

export const Company = mongoose.model<ICompany>('Company', CompanySchema)
