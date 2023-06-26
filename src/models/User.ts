import mongoose, { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  role: string
  email: string
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
  },
  role: {
    type: String,
    required: [true, 'please select your role'],
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
  },
})

export const User = mongoose.model<IUser>('User', UserSchema)
