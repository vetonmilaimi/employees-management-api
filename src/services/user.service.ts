import UserModel from '../models/db/user.model'
import { SuperAdminCredentials, USER_ROLES } from '../utils/constants'
import { IUserRegisterRequest } from '../utils/types'
import CryptService from './crypt.service'
import Redis from './redis.service'
import TokenService from './token.service'

class UserService {
  private sessionRepo
  private tokenService

  constructor() {
    const redis = Redis.getInstance()

    this.sessionRepo = redis.getSessionRepo()
    this.tokenService = new TokenService()
  }

  public getUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email }).lean().exec()
  }

  public create = async (data: IUserRegisterRequest) => {
    return await UserModel.create(data)
  }

  public saveSession = async (userId: string, userRole: USER_ROLES) => {
    return await this.sessionRepo.save({
      userId: userId,
      userRole: userRole,
      accessToken: this.tokenService.generateToken(),
      refreshToken: this.tokenService.generateToken(),
      accessTokenExp: this.tokenService.generateExpTime('1d'),
      refreshTokenExp: this.tokenService.generateExpTime('5d'),
    })
  }

  public async deleteSession(entityId: string) {
    await this.sessionRepo.remove(entityId)
  }

  public async findSession(accessToken: string) {
    return await this.sessionRepo.search().where('accessToken').equalTo(accessToken).return.first()
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
