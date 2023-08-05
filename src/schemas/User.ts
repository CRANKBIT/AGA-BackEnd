import Joi from 'joi'

const UserSchema = Joi.object({
  email: Joi.string().email().required(),
})

export default UserSchema
