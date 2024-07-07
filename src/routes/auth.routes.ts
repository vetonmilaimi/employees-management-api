import { Router } from 'express'
import validator from '../middleware/routeValidator.middleware'
import ValidationSchemas from '../utils/validationSchemas'
import controllers from '../controllers'

const router = Router()

router.post('/register', validator.body(ValidationSchemas.register), controllers.user.register)

router.post('/login', validator.body(ValidationSchemas.login), controllers.user.login)

export default router
