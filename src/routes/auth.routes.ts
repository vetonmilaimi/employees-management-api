import { Router } from 'express'
import validator from '../middleware/routeValidator.middleware'
import ValidationSchemas from '../utils/validationSchemas'
import controllers from '../controllers'
import authMiddleware from '../middleware/auth.middleware'

const router = Router()

router.post('/register', validator.body(ValidationSchemas.register), controllers.user.register)

router.post('/login', validator.body(ValidationSchemas.login), controllers.user.login)

router.get(
  '/regenerate-tokens',
  validator.headers(ValidationSchemas.headerTokens),
  authMiddleware.validateRefreshToken,
  controllers.user.regenerateTokens
)

router.get('/logout', validator.headers(ValidationSchemas.accessToken), authMiddleware.validateAccessToken, controllers.user.logout)

export default router
