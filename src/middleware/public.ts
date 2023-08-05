import { Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import connectDB from '../database'
import Request from '../types/Request'
import { publicModel } from '../models'

const publicMW = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const subdomain = req.headers.host.split('.')[0]
  if (subdomain !== (process.env.PUBLIC_HOST || 'www')) {
    const connection = await connectDB(subdomain)
    if (connection instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Error DB' })
    } else {
      req.db = connection
      req.model = publicModel(connection)
      next()
    }
  }
  res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid host' })
}

export default publicMW
