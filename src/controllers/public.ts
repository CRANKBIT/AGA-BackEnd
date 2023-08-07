 import { Response } from 'express'
 import Request from '../types/Request'

// 进入一个不存在的company subdomain => 404 //Tao
 const checkSubDomain = async (req: Request, res: Response): Promise<void> => {
  try {
    const {domain} = req.body

    console.log(domain)
    // check if this subdomian is exist in company list
     res.json(domain)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export default checkSubDomain
