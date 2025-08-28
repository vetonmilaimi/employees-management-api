import { Router } from 'express'
import validator from '../middleware/routeValidator.middleware'
import ValidationSchemas from '../utils/validationSchemas'
import authMiddleware from '../middleware/auth.middleware'
import organizationMiddleware from '../middleware/organization.middleware'
import controllers from '../controllers'
import { USER_ROLES } from '../utils/constants'

const router = Router()

router.post(
  '/add',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  validator.body(ValidationSchemas.jobEventBody),
  authMiddleware.validateAccessToken,
  authMiddleware.managerGuard,
  organizationMiddleware.validateOrganization,
  controllers.jobEvent.create
)

router.get(
  '/list',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  authMiddleware.validateAccessToken,
  authMiddleware.roleGuard([USER_ROLES.MANAGER, USER_ROLES.USER]),
  organizationMiddleware.validateOrganization,
  controllers.jobEvent.list
)

router.post(
  '/update',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  validator.query(ValidationSchemas.mongoId),
  validator.body(ValidationSchemas.jobEventBody),
  authMiddleware.validateAccessToken,
  authMiddleware.roleGuard([USER_ROLES.MANAGER]),
  organizationMiddleware.validateOrganization,
  controllers.jobEvent.update
)

router.post(
  '/delete',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  validator.query(ValidationSchemas.mongoId),
  authMiddleware.validateAccessToken,
  authMiddleware.managerGuard,
  organizationMiddleware.validateOrganization,
  controllers.jobEvent.delete
)

router.get(
  '/time-on-project',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  validator.query(ValidationSchemas.mongoId),
  authMiddleware.validateAccessToken,
  authMiddleware.managerGuard,
  organizationMiddleware.validateOrganization,
  controllers.jobEvent.timeOnProject
)

router.get(
  '/',
  validator.headers(ValidationSchemas.accessToken),
  validator.headers(ValidationSchemas.organizationId),
  validator.query(ValidationSchemas.mongoId),
  authMiddleware.validateAccessToken,
  organizationMiddleware.validateOrganization,
  controllers.jobEvent.findById
)

export default router
