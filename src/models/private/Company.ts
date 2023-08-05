import mongoose, { Document } from 'mongoose'

export interface ICompany extends Document {
  domain: string
}

export const CompanySchema = new mongoose.Schema({
  domain: {
    type: String,
    required: [true, 'Please enter your company name'],
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
})
