import mongoose from 'mongoose'
import { createCompanySchema } from './models/private/Company'

mongoose.set('strictQuery', false)

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Please make sure that MONGO_URI is defined in .env file')
    }
    // setup www
    const wwwConnection = mongoose.createConnection(`${process.env.MONGO_URI}${process.env.MAIN_DB_NAME || 'www'}`)
    const CompanyModel = createCompanySchema(wwwConnection)
    const companyExsits = await CompanyModel.findOne({ domain: 'www' })
    if (!companyExsits) {
      await CompanyModel.create({ domain: 'www' })
    }
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}

export default connectDB
