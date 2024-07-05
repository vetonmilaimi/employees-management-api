import '../config/env.config'
import app from '../app'
import { SERVER_PORT } from '../utils/constants'
import Server from './server'

new Server({ app, port: SERVER_PORT })
