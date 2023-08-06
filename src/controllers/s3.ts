import { Request, Response } from 'express'
import { PutObject, GetObject, DeleteObject } from '../utils/s3'

export const getImage = async (req: Request, res: Response): Promise<void> => {
  const imageKey: string = req.params.id
  try {
    const data = await GetObject(`${imageKey}`)
    res.set('Content-Disposition', `attachment ;filename="${imageKey}"`)
    await (data.Body as any).pipe(res)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  const fileModel = req.files.uploadedFileName as any
  const maxSize = 5 * 1024 * 1024
  if (fileModel.size > maxSize) {
    res.status(400).json({
      error: 'File size is too big',
    })
  }
  const imageKey = `uploads/${Date.now()}-${fileModel.name}`
  const fileBody = Buffer.from(fileModel.data, 'binary')
  try {
    const response = await PutObject(imageKey, fileBody)
    if (response) {
      res.status(201).json({ msg: imageKey })
    }
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  const imageKey: string = req.params.id
  try {
    const response = await DeleteObject(`${imageKey}`)
    if (response) {
      res.status(200).json({ msg: `Successfully deleted file ${imageKey}` })
    }
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
