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
  authMiddleware.adminGuard,
  controllers.user.list
)

router.delete(
  '/user-delete',
  validator.headers(ValidationSchemas.accessToken),
  validator.query(ValidationSchemas.mongoId),
  authMiddleware.validateAccessToken,
  authMiddleware.adminGuard,
  controllers.user.delete
)

router.post(
  '/user-invite',
  validator.headers(ValidationSchemas.accessToken),
  validator.body(ValidationSchemas.inviteUser),
  authMiddleware.validateAccessToken,
  authMiddleware.adminGuard,
  controllers.user.inviteUser
)

export default router
