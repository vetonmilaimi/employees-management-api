import { IOrganization, UserSession } from './types'

export {}

declare global {
  namespace Express {
    export interface Request {
      session: UserSession
      organization: IOrganization
      activate: {
        email: string
      }
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
      ADMIN_EMAIL: string
      ADMIN_PWD: string
      ADMIN_FIRST_NAME: string
      ADMIN_LAST_NAME: string
      SALT_ROUNDS: string
      BASE_API_URL: string
      JWT_KEY: string
      CLIENT_URL: string

      MAILER_HOST: string
      MAILER_PORT: string
      MAILER_USER: string
      MAILER_SECURE: string
      MAILER_PASS: string
    }
  }
}
