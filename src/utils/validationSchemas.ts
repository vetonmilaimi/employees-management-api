import Joi from 'joi'
import { PASSWORD_REGEX, JOB_EVENT_STATUS } from './constants'

class ValidationSchemas {
  static register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(PASSWORD_REGEX).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  })

  static inviteUser = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  })

  static activateAccount = Joi.object({
    password: Joi.string().regex(PASSWORD_REGEX).required(),
  })

  static login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  static mongoId = Joi.object({
    _id: Joi.string().required(),
  })

  static accessToken = Joi.object({
    'access-token': Joi.string().required(),
  })

  static activateToken = Joi.object({
    'activate-token': Joi.string().required(),
  })

  static organizationId = Joi.object({
    'organization-id': Joi.string().required(),
  })

  static headerTokens = Joi.object({
    'access-token': Joi.string().required(),
    'refresh-token': Joi.string().required(),
  })

  static organizationBody = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(''),
  })

  static projectBody = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(''),
  })

  static jobEventBody = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional().allow(''),
    project: Joi.string().required(),
    employees: Joi.array().items(Joi.string()).optional(),
    start: Joi.date().optional(),
    end: Joi.date().optional(),
    status: Joi.string()
      .valid(...Object.values(JOB_EVENT_STATUS))
      .optional(),
  })
}

export default ValidationSchemas
