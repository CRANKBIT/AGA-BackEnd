import { Response } from 'express'
import Joi from 'joi'
import Request from '../../types/Request'
import { ICompany } from '../../models/private/Company'
import CompanySchema from '../../schemas/Company'

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const companyData = req.body as Partial<ICompany>
    const { error } = CompanySchema.validate(companyData)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const newCompany = await req.model.Company.create(companyData)
    res.json(newCompany)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getCompanys = async (req: Request, res: Response): Promise<void> => {
  try {
    const company = req.model.Company.find().lean()
    if (!company) {
      res.status(404).json({ error: 'Company not found' })
    } else {
      res.json(company)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const companyId = req.params.id
    const { error } = Joi.string().required().validate(companyId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const company = req.model.Company.findById(companyId).lean()
    if (!company) {
      res.status(404).json({ error: 'Company not found' })
    } else {
      res.json(company)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const companyId = req.params.id
    const updatedData = req.body as Partial<ICompany>
    const { error } = Joi.string().required().validate(companyId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const updatedCompany = req.model.Company.findByIdAndUpdate(companyId, updatedData, { new: true }).lean()
    if (!updatedCompany) {
      res.status(404).json({ error: 'Company not found' })
    } else {
      res.json(updatedCompany)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const companyId = req.params.id
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
