import { Response } from 'express'
import Joi from 'joi'
import Request from '../types/Request'
import sendEmail from '../utils/email'

export const sendInviteEmial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId } = req
    if (tenantId == null) {
      res.status(500).json({ error: 'Auth error' })
    }
    let { email } = req.params
    email = decodeURIComponent(email)
    const newUser = await req.model.User.create({ email })
    const JWT = newUser.createJwt()
    try {
      const { referer } = req.headers
      const url = new URL(referer)
      url.pathname = ''
      url.search = ''
      url.hash = `/publicLogin/${encodeURIComponent(`/user/my-reports`)}/${encodeURIComponent(
        JSON.stringify({
          user: newUser,
          token: JWT,
        })
      )}`
      await sendEmail(email, 'Invitation', `${url}`)
    } catch (error) {
      /* empty */
    }
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getMyUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await req.model.User.find().lean()
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    } else {
      res.json(user)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id
    const { error } = Joi.string().required().validate(userId)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const deletedUser = await req.model.User.findByIdAndDelete(userId).lean()
    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' })
    } else {
      res.json(deletedUser)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
