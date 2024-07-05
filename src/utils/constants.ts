export const NODE_ENV = process.env.NODE_ENV || 'development'
export const SERVER_PORT = process.env.PORT || '3000'
export const HOST_NAME = process.env.HOST || 'localhost'
export const DATABASE_URL = process.env.DB_URL || ''

export const isProduction = NODE_ENV === 'production'
