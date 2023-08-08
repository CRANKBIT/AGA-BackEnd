import mongoose, { Document } from 'mongoose'

export interface ICompany extends Document {
  domain: string
}

export const CompanySchema = new mongoose.Schema({
  domain: {
    type: String,
    required: [true, 'Please enter your company name'],
    unique: true,
    maxlength: 10,
    match: [/^[a-zA-Z0-9-]+$/, 'Please enter a valid domain name'],
  },
})
