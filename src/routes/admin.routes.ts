import { Router } from 'express'
import validator from '../middleware/routeValidator.middleware'
import ValidationSchemas from '../utils/validationSchemas'
import authMiddleware from '../middleware/auth.middleware'
import controllers from '../controllers'

const router = Router()

router.get(
  '/list-users',
  validator.headers(ValidationSchemas.accessToken),
  authMiddleware.validateAccessToken,
  authMiddleware.superAdminGuard,
  controllers.user.list
)

router.delete(
  '/user-delete',
  validator.headers(ValidationSchemas.accessToken),
  validator.query(ValidationSchemas.mongoId),
  authMiddleware.validateAccessToken,
  authMiddleware.superAdminGuard,
  controllers.user.delete
)

export default router
