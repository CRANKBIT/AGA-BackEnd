import { Response } from 'express'
import Joi from 'joi'
import Request from '../types/Request'
import { IReport } from '../models/Report'
import ReportSchema from '../schemas/Report'

export const createReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const reportData = req.body as Partial<IReport>
    const { error } = ReportSchema.validate(reportData)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const newReport = await req.model.Report.create(reportData)
    res.json(newReport)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = req.model.Report.find().lean()
    if (!report) {
      res.status(404).json({ error: 'Report not found' })
    } else {
      res.json(report)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getReportById = async (req: Request, res: Response): Promise<void> => {
  try {
    const reportId = req.params.id
    const { error } = Joi.string().required().validate(reportId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const report = req.model.Report.findById(reportId).lean()
    if (!report) {
      res.status(404).json({ error: 'Report not found' })
    } else {
      res.json(report)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateReportById = async (req: Request, res: Response): Promise<void> => {
  try {
    const reportId = req.params.id
    const updatedData = req.body as Partial<IReport>
    const { error } = Joi.string().required().validate(reportId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const updatedReport = req.model.Report.findByIdAndUpdate(reportId, updatedData, { new: true }).lean()
    if (!updatedReport) {
      res.status(404).json({ error: 'Report not found' })
    } else {
      res.json(updatedReport)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteReportById = async (req: Request, res: Response): Promise<void> => {
  try {
    const reportId = req.params.id
    const { error } = Joi.string().required().validate(reportId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const deletedReport = await req.model.Report.findByIdAndDelete(reportId).lean()
    if (!deletedReport) {
      res.status(404).json({ error: 'Report not found' })
    } else {
      res.json(deletedReport)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
