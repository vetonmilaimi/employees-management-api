import UserModel from '../models/db/user.model'
import { SuperAdminCredentials, USER_ROLES } from '../utils/constants'
import { IUserRegister } from '../utils/types'
import CryptService from './crypt.service'

class UserService {
  public getUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email }).lean().exec()
  }

  public create = async (data: IUserRegister) => {
    return await UserModel.create(data)
  }

  public static checkSuperAdmin = async () => {
    const hasSuperAdmin = await UserModel.findOne({ role: USER_ROLES.SUPER_ADMIN })
    if (hasSuperAdmin) {
      return
    }
    await UserModel.create({
      email: SuperAdminCredentials.email,
      firstName: SuperAdminCredentials.first_name,
      lastName: SuperAdminCredentials.last_name,
      password: CryptService.hash(SuperAdminCredentials.password),
      role: USER_ROLES.SUPER_ADMIN,
    })
  }
}

export default UserService
