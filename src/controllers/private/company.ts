import { Response } from 'express'
import Joi from 'joi'
import Request from '../../types/Request'
import { ICompany } from '../../models/private/Company'
import CompanySchema from '../../schemas/Company'

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId } = req
    const companyData = req.body as ICompany
    const { error } = CompanySchema.validate(companyData)
    if (error) {
      throw new Error(error.details[0].message)
    }
    if (['admin', 'test', 'local'].includes(companyData.domain)) {
      res.status(500).json({ error: `Not allowed domain: ${companyData.domain}` })
    }
    const newCompany = await req.model.Company.create(companyData)
    const tenant = await req.model.Tenant.findById(tenantId)
    tenant.company.push(newCompany._id)
    await tenant.save()
    res.json(newCompany)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getMyCompanys = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId } = req
    const tenant = await req.model.Tenant.findById(tenantId).populate('company')
    const companies = await Promise.all(
      tenant.company.map(async (companyId) => {
        const company = await req.model.Company.findById(companyId)
        return company
      })
    )
    res.json(companies)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const companyId = req.params.id
    // 删除company => 同时删除数据库
    // auth check
    const { error } = Joi.string().required().validate(companyId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const deletedCompany = await req.model.Company.findByIdAndDelete(companyId).lean()
    if (!deletedCompany) {
      res.status(404).json({ error: 'Company not found' })
    } else {
      res.json(deletedCompany)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
