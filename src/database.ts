import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const connectDB = async (subdomain: string): Promise<mongoose.Connection> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Please make sure that MONGO_URI is defined in .env file')
    }
    // setup www
    return mongoose.createConnection(`${process.env.MONGO_URI}${subdomain}`)
  } catch (err) {
    console.error(err.message)
    return err
  }
}

export default connectDB
