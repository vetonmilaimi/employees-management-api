import { Router } from 'express'
import validator from '../middleware/routeValidator.middleware'
import ValidationSchemas from '../utils/validationSchemas'
import authMiddleware from '../middleware/auth.middleware'
import controllers from '../controllers'

const router = Router()

router.post(
  '/create',
  validator.headers(ValidationSchemas.accessToken),
  validator.body(ValidationSchemas.createOrganization),
  authMiddleware.validateAccessToken,
  authMiddleware.adminGuard,
  controllers.organization.create
)

router.delete(
  '/delete',
  validator.headers(ValidationSchemas.accessToken),
  validator.query(ValidationSchemas.mongoId),
  authMiddleware.validateAccessToken,
  authMiddleware.adminGuard,
  controllers.organization.delete
)

router.get(
  '/about',
  validator.headers(ValidationSchemas.accessToken),
  authMiddleware.validateAccessToken,
  authMiddleware.adminGuard,
  controllers.organization.about
)

export default router
