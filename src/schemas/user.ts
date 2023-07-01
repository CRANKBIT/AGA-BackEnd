import { object, string } from 'joi'

const StaffSchema = object({
  name: string().min(3).max(50),
  email: string().email().required(),
  role: string(),
})

export default StaffSchema
