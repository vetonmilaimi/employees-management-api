import { Request, Response, Router } from 'express'
import authRoutes from './auth.routes'

const router = Router()

router.get('/health', (_request: Request, response: Response) => {
  response.status(200).json({ health: 'OK' })
})

router.use('/auth', authRoutes)

export default router
