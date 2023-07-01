import mongoose, { Document } from 'mongoose'

export interface IReport extends Document {
  title: string
}

const ReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please enter your report title.'],
  },
})

export const Report = mongoose.model<IReport>('Report', ReportSchema)
