import Joi from 'joi'
import { PASSWORD_REGEX } from './constants'

class ValidationSchemas {
  static register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(PASSWORD_REGEX).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  })
}

export default ValidationSchemas
