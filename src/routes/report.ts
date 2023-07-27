import express from 'express'
import { createReport, getReports, getReportById, updateReportById, deleteReportById } from '../controllers/report'

const reportRouter = express.Router()

// Create a new report
reportRouter.post('/', createReport)

// Get all reports
reportRouter.get('/', getReports)

// Get a single report by ID
reportRouter.get('/:id', getReportById)

// Update a report by ID
reportRouter.put('/:id', updateReportById)

// Delete a report by ID
reportRouter.delete('/:id', deleteReportById)

export default reportRouter
