import 'dotenv/config'
import 'express-async-errors'

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import connectDB from './database'
import swaggerJsDoc from './utils/swagger'

import v1Router from './routes'

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())

// Connect to MongoDB

// routes
app.use('/api/v1', v1Router)

// health check api
app.get('/health-check', (request, response) => response.status(200).send({ message: 'healthy' }))

// swagger api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc))

app.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerJsDoc)
})

// TODO: error handler
const port = process.env.PORT || 5000

const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is started on ${process.env.SERVER_URL || `http://localhost:${port}`}`))
  } catch (error) {
    console.log(error)
  }
}

start()
