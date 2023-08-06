// import { Response } from 'express'
// import Joi from 'joi'
// import Request from '../../types/Request'
// import { ICompany } from '../../models/private/Company'
// import CompanySchema from '../../schemas/Company'

// 进入一个不存在的company subdomain => 404 //Tao
// export const checkCompany = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const {subdomain} = req.body
//     // check if this subdomian is exist in company list

//     res.json(newCompany)
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' })
//   }
// }
