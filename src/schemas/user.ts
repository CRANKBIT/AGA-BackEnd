import Joi from 'joi'

const User = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email().required(),
  role: Joi.string(),
})

export default User
