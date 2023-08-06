import mongoose, { Document, Schema } from 'mongoose'

export interface Items extends Document {
  serviceItems: string[]
}
const ServiceSchema = new Schema<Items>({
  serviceItems: [{ type: String }],
})

const ServiceItemModel = mongoose.model<Items>('ServiceItem', ServiceSchema)

export default ServiceItemModel
