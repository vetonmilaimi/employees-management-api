import { Router } from 'express'
import controllers from '../controllers'
import validator from '../middleware/routeValidator.middleware'
import ValidationSchemas from '../utils/validationSchemas'
import authMiddleware from '../middleware/auth.middleware'
import organizationMiddleware from '../middleware/organization.middleware'

const router = Router()

router.post(
  '/create',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  validator.body(ValidationSchemas.projectBody),
  authMiddleware.validateAccessToken,
  authMiddleware.managerGuard,
  organizationMiddleware.validateOrganization,
  controllers.project.create
)

router.get(
  '/list',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  authMiddleware.validateAccessToken,
  organizationMiddleware.validateOrganization,
  controllers.project.list
)

router.post(
  '/update',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  validator.query(ValidationSchemas.mongoId),
  validator.body(ValidationSchemas.projectBody),
  authMiddleware.validateAccessToken,
  authMiddleware.managerGuard,
  organizationMiddleware.validateOrganization,
  controllers.project.update
)

router.post(
  '/delete',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  validator.query(ValidationSchemas.mongoId),
  authMiddleware.validateAccessToken,
  authMiddleware.managerGuard,
  organizationMiddleware.validateOrganization,
  controllers.project.delete
)

router.get(
  '/',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  validator.query(ValidationSchemas.mongoId),
  authMiddleware.validateAccessToken,
  organizationMiddleware.validateOrganization,
  controllers.project.findById
)

export default router
