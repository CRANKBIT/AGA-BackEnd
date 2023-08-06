import { Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import connectDB from '../database'
import Request from '../types/Request'
import { privateModel } from '../models'

const privateMW = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const subdomain = new URL(req.headers.origin).hostname.split('.')[0]
  if (subdomain === (process.env.MAIN_HOST || 'www')) {
    const connection = await connectDB(subdomain)
    if (connection instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Error DB' })
    } else {
      req.db = connection
      req.model = privateModel(connection)
      next()
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid host' })
  }
}

export default privateMW
