import mongoose, { Document, Model } from 'mongoose'

export interface ICompany extends Document {
  domain: string
}

export const createCompanySchema = (connection: mongoose.Connection): Model<ICompany> => {
  const CompanySchema = new mongoose.Schema({
    domain: {
      type: String,
      required: [true, 'Please enter your company name'],
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
  })

  const existingModel = connection.model<ICompany>('Company')
  if (existingModel) {
    return existingModel
  }

  return connection.model<ICompany>('Company', CompanySchema)
}
