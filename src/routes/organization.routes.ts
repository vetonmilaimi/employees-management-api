import { Router } from 'express'
import validator from '../middleware/routeValidator.middleware'
import ValidationSchemas from '../utils/validationSchemas'
import authMiddleware from '../middleware/auth.middleware'
import controllers from '../controllers'

const router = Router()

router.post(
  '/create',
  validator.headers(ValidationSchemas.headerTokens),
  validator.body(ValidationSchemas.createOrganization),
  authMiddleware.validateAccessToken,
  controllers.organization.create
)

export default router
