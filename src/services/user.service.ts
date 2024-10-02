import UserModel from '../models/db/user.model'
import { AdminCredentials, USER_ROLES } from '../utils/constants'
import { IUserInvitationRequest, IUserRegisterRequest } from '../utils/types'
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

  public getUserById = async (userId: string) => {
    return await UserModel.findById(userId).lean().exec()
  }

  public deleteUserById = async (userId: string) => {
    return await UserModel.findByIdAndDelete(userId).lean().exec()
  }

  public create = async (data: IUserRegisterRequest | IUserInvitationRequest) => {
    return await UserModel.create(data)
  }

  public list = async () => {
    return await UserModel.find({}).lean().exec()
  }

  public createPassword = async (_id: string, password: string) => {
    return await UserModel.findByIdAndUpdate(_id, { password, activated: true, activateToken: null })
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
    const hasSuperAdmin = await UserModel.findOne({ role: USER_ROLES.ADMIN }).lean().exec()
    if (hasSuperAdmin) {
      return
    }
    await UserModel.create({
      email: AdminCredentials.email,
      firstName: AdminCredentials.first_name,
      lastName: AdminCredentials.last_name,
      password: CryptService.hash(AdminCredentials.password),
      role: USER_ROLES.ADMIN,
      activated: true,
    })
  }
}

export default UserService
