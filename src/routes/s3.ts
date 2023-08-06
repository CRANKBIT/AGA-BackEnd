import express from 'express'
import fileUpload from 'express-fileupload'
import { getImage, uploadImage, deleteImage } from '../controllers/s3'

const s3Router = express.Router()

s3Router.use(fileUpload())

s3Router.get('/getImage/:id', getImage)

s3Router.post('/uploadImage/:id', uploadImage)

s3Router.post('/deleteImage/:id', deleteImage)

export default s3Router
