import { Request, Response, Router } from 'express'

const router = Router()

router.get('/health', (_request: Request, response: Response) => {
  response.status(200).json({ health: 'OK' })
})

export default router
