import Joi from 'joi'

const ReportSchema = Joi.object({
  Year: Joi.string().min(1).max(50),
  Make: Joi.string().min(1).max(50),
  Model: Joi.string().min(1).max(50),
  Rego: Joi.string().min(1).max(50),
  Odometer: Joi.string().min(1).max(50),
  CustomerName: Joi.string().min(1).max(50),
  service: Joi.array().items(Joi.string()).label('Service'),
})

export default ReportSchema
