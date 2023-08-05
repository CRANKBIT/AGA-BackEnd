import { JwtPayload } from 'jsonwebtoken'
import { Connection } from 'mongoose'
import { IModels } from '../models'

type Payload = {
  db: Connection
  model: IModels
  tenantId: string
  userId: string
} & JwtPayload

export default Payload
