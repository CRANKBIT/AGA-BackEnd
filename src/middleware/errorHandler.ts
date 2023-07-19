import { NextFunction, Request, Response } from 'express'

const ERROR_MESSAGES = {
  InvalidEmailFormat: 'Invalid email format',
  UserNotFound: 'User not found',
  ServerError: 'Server error',
}

// Handle server errors
export const handleServerError = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('Server error:', error)
  res.status(500).json({ error: ERROR_MESSAGES.ServerError })
  next(error)
}

// Handle not found errors
export const handleNotFound = (message: string, req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ error: message })
  next()
}
