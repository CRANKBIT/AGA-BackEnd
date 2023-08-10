import Joi from 'joi'

const domainErrorMessage = 'Please provide a valid domain name.'

const CompanySchema = Joi.object({
  domain: Joi.string()
    .required()
    .max(10)
    .regex(/^[a-zA-Z0-9-]+$/)
    .error(() => domainErrorMessage),
})

export default CompanySchema
