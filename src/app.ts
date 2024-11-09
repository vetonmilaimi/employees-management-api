import 'express-async-errors'
import express, { Express } from 'express'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import AppConfig from './config/app.config'
import routes from './routes'
import { errorMiddleware, routeNotFoundMiddleware } from './middleware/error.middleware'
import { CLIENT_URL } from './utils/constants'

AppConfig.startup()

const app: Express = express()
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join('public')))
app.use(express.json())
app.use(cors({ origin: [CLIENT_URL, 'https://employees-management-client.vercel.app/'] }))

app.use('/v1', routes)

app.use(routeNotFoundMiddleware)
app.use(errorMiddleware)

export default app
