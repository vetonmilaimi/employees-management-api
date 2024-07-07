import { USER_ROLES } from './constants'

export interface UserSession {
  entityId: string
  userId: string
  accessToken: string
  refreshToken: string
  accessTokenExp: number
  refreshTokenExp: number
  userRole: USER_ROLES
}

export interface IUser {
  _id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: USER_ROLES
}

export interface IUserRegisterRequest extends Omit<IUser, '_id' | 'role'> {}
export interface IUserLoginRequest extends Pick<IUser, 'email' | 'password'> {}
