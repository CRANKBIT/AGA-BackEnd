import { Response } from 'express'
import Request from '../types/Request'
import connectDB from '../database'
import { privateModel } from '../models'

// 进入一个不存在的company subdomain => 404 //Tao
const checkSubDomain = async (req: Request, res: Response): Promise<void> => {
  try {
    const { domain } = req.params
    const subdomain = process.env.MAIN_HOST || 'www'
    console.log(domain)
    const connection = await connectDB(subdomain)
    req.model = privateModel(connection)
    // check if this subdomian is exist in company list
    const result = await req.model.Company.findOne({ domain})
    if (result) {
      res.json(true)
    } else {
      res.json(false)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export default checkSubDomain
