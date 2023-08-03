import { JwtPayload } from 'jsonwebtoken'

type Payload = {
  tenantId: string
  userId: string
} & JwtPayload

export default Payload
