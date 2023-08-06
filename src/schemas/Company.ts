import Joi from 'joi'

const domainErrorMessage = 'Please provide a valid domain name.'

const CompanySchema = Joi.object({
  domain: Joi.string()
    .required()
    .min(3)
    .max(30)
    .error(() => domainErrorMessage),
})

export default CompanySchema
