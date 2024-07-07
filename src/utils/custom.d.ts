import { UserSession } from './types'

export {}

declare global {
  namespace Express {
    export interface Request {
      session: UserSession
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined
      PORT: string
      NODE_ENV: string
      HOST: string
      DB_URL: string
      REDIS_URL: string
      SUPER_ADMIN_EMAIL: string
      SUPER_ADMIN_PWD: string
      SUPER_ADMIN_FIRST_NAME: string
      SUPER_ADMIN_LAST_NAME: string
      SALT_ROUNDS: string
      BASE_API_URL: string
      JWT_KEY: string
      CLIENT_URL: string
    }
  }
}
