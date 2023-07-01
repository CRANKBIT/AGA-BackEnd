import { object, string } from 'joi'

const domainErrorMessage = 'Please provide a valid domain name ending with ".crankbit.net".'

const CompanySchema = object({
  domain: string()
    .required()
    .min(3)
    .max(30)
    .regex(/^[A-Za-z0-9_-]+\.crankbit\.net$/)
    .error(new Error(domainErrorMessage)),
})

export default CompanySchema
