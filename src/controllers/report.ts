import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Request from '../types/Request'
import ReportSchema from '../schemas/Report'

const createReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = ReportSchema.validate(req.body)
    if (error) {
      console.log(error.message)
      res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
      return
    }

    const report = await Report.create(value)

    console.log(report)
    res.status(StatusCodes.CREATED).json({ report })
  } catch (error) {
    console.log(error.message)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
  }
}

export default { createReport }
