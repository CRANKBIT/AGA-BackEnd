import { JwtPayload } from 'jsonwebtoken'

type Payload =
  | {
      userId: string
    }
  | JwtPayload

export default Payload
