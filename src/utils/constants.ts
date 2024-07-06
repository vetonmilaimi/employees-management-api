export const NODE_ENV = process.env.NODE_ENV || 'development'
export const SERVER_PORT = process.env.PORT || '3000'
export const HOST_NAME = process.env.HOST || 'localhost'
export const DATABASE_URL = process.env.DB_URL || ''
export const SALT_ROUNDS = process.env.SALT_ROUNDS || '10'

export const isProduction = NODE_ENV === 'production'

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
export const EMAIL_REGEX = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

export enum USER_ROLES {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
}
