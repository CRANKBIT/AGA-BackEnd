import { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
  email: string
  token: string
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  token: {
    type: String,
    required: [true, 'please provide your token'],
  },
})

const UserModel = model<IUser>('User', UserSchema)
export default UserModel
