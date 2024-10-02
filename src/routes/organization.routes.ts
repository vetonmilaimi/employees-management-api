import { Router } from 'express'
import validator from '../middleware/routeValidator.middleware'
import ValidationSchemas from '../utils/validationSchemas'
import authMiddleware from '../middleware/auth.middleware'
import controllers from '../controllers'

const router = Router()

router.post(
  '/create',
  validator.headers(ValidationSchemas.accessToken),
  validator.body(ValidationSchemas.organizationBody),
  authMiddleware.validateAccessToken,
  authMiddleware.managerGuard,
  controllers.organization.create
)

router.post(
  '/update',
  validator.headers(ValidationSchemas.accessToken),
  validator.body(ValidationSchemas.organizationBody),
  authMiddleware.validateAccessToken,
  authMiddleware.managerGuard,
  controllers.organization.update
)

/* 
  We don't need this route for delete an organization
  just because manager can have only one organization
  and also he can update if he made a mistake
*/
// router.delete(
//   '/delete',
//   validator.headers(ValidationSchemas.accessToken),
//   validator.query(ValidationSchemas.mongoId),
//   authMiddleware.validateAccessToken,
//   authMiddleware.managerGuard,
//   controllers.organization.delete
// )

router.get(
  '/about',
  validator.headers(ValidationSchemas.accessToken),
  authMiddleware.validateAccessToken,
  authMiddleware.managerGuard,
  controllers.organization.about
)

router.post(
  '/add-employee',
  validator.headers(ValidationSchemas.accessToken),
  validator.body(ValidationSchemas.inviteUser),
  authMiddleware.validateAccessToken,
  authMiddleware.managerGuard,
  controllers.organization.addEmployee
)

export default router
