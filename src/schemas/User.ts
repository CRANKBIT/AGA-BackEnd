import Joi from 'joi'

const UserSchema = Joi.object({
  // name: Joi.string().min(3).max(50),
  email: Joi.string().email().required(),
  token: Joi.string(),
})

export default UserSchema
