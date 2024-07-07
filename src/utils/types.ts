import { USER_ROLES } from './constants'

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
