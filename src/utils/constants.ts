export const NODE_ENV = process.env.NODE_ENV || 'development'
export const SERVER_PORT = process.env.PORT || '3000'
export const HOST_NAME = process.env.HOST || 'localhost'
export const DATABASE_URL = process.env.DB_URL || ''
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
export const SALT_ROUNDS = process.env.SALT_ROUNDS || '10'
export const JWT_SECRET = process.env.JWT_KEY || ''
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'
export const MAILER_HOST = process.env.MAILER_HOST || ''
export const MAILER_PORT = process.env.MAILER_PORT || ''
export const MAILER_USER = process.env.MAILER_USER || ''
export const MAILER_PASS = process.env.MAILER_PASS || ''
export const MAILER_SECURE = process.env.MAILER_SECURE === 'true' ? true : false

export const isProduction = NODE_ENV === 'production'

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
export const EMAIL_REGEX = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

export enum USER_ROLES {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user', // => This is employee
}

export enum JOB_EVENT_STATUS {
  TODO = 'todo',
  IN_PROGRESS = 'in progress',
  ON_REVIEW = 'on review',
  DONE = 'done',
}

export const AdminCredentials = {
  email: process.env.ADMIN_EMAIL || '',
  password: process.env.ADMIN_PWD || '',
  first_name: process.env.ADMIN_FIRST_NAME || '',
  last_name: process.env.ADMIN_LAST_NAME || '',
}
