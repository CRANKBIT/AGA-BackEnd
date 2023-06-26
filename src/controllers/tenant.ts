import { Request, Response } from 'express'
import { Tenant } from '../models/Tenant'

const createTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, companies } = req.body

    const newTenant = new Tenant({
      name,
      email,
      password,
      companies,
    })

    await newTenant.save()

    const token = newTenant.createJwt()

    res.status(201).json({ message: 'Tenant created successfully', token })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create tenant', error: error.message })
  }
}

export default createTenant
