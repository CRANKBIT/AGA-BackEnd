import { object, string } from 'joi'

const TenantSchema = object({
  name: string().min(3).max(50),
  email: string().email().required(),
  password: string().min(6),
})

export default TenantSchema
