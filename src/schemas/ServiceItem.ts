import Joi from 'joi'

const ServiceItemSchema = Joi.array().items(Joi.string()).required();

export default ServiceItemSchema
