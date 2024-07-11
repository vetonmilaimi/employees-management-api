import { Request, Response, Router } from 'express'
import authRoutes from './auth.routes'
import organizationRoutes from './organization.routes'

const router = Router()

router.get('/health', (_request: Request, response: Response) => {
  response.status(200).json({ health: 'OK' })
})

router.use('/auth', authRoutes)
router.use('/organization', organizationRoutes)

export default router
