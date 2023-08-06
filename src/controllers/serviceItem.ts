import { NextFunction, Request, Response } from 'express'
import ServiceItemModel, { Items } from '../models/ServiceItem'
import { handleServerError } from '../middleware/errorHandler'

// Create a new Service
export const createService = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { serviceItems } = req.body
  try {
    const newService: Items = new ServiceItemModel({ serviceItems })
    await newService.save()
    res.status(201).json(newService)
  } catch (error) {
    handleServerError(error, req, res, next)
  }
}
// Get serviceitem
export const getService = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const services: Items[] = await ServiceItemModel.find()
    res.status(200).json(services)
  } catch (error) {
    handleServerError(error, req, res, next)
  }
}
