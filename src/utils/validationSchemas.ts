import Joi from 'joi'
import { PASSWORD_REGEX } from './constants'

class ValidationSchemas {
  static register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(PASSWORD_REGEX).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  })

  static login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  static accessToken = Joi.object({
    'access-token': Joi.string().required(),
  })

  static headerTokens = Joi.object({
    'access-token': Joi.string().required(),
    'refresh-token': Joi.string().required(),
  })
}

export default ValidationSchemas
