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
  activated: boolean
  activateToken?: string
}

export interface IUserRegisterRequest extends Omit<IUser, '_id' | 'role'> {}
export interface IUserLoginRequest extends Pick<IUser, 'email' | 'password'> {}
export interface IUserInvitationRequest extends Pick<IUser, 'email' | 'firstName' | 'lastName'> {}
export interface IUserCreatePasswordRequest extends Pick<IUser, 'password'> {}

export interface IOrganization {
  _id: string
  name: string
  description?: string
  users: string[]
}

export interface IOrganizationCreateReq extends Omit<IOrganization, '_id' | 'users'> {}
