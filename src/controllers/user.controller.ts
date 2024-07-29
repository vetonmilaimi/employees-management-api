import { Request, Response } from 'express'
import BaseResponse from '../utils/BaseResponse'
import { IUserInvitationRequest, IUserLoginRequest, IUserRegisterRequest } from '../utils/types'
import UserService from '../services/user.service'
import CryptService from '../services/crypt.service'
import { LoginError, SuperAdminCannotBeDeleted, UserExistsError, UserNotFoundError } from '../utils/exceptions'
import { CLIENT_URL, USER_ROLES } from '../utils/constants'
import TokenService from '../services/token.service'

class UserController {
  private userService
  private tokenService

  constructor() {
    this.userService = new UserService()
    this.tokenService = new TokenService()
  }

  public me = async (req: Request, res: Response) => {
    // Handle this response
    return BaseResponse(res).success({})
  }

  public list = async (req: Request, res: Response) => {
    const users = await this.userService.list()

    return BaseResponse(res).success(users)
  }

  public delete = async (req: Request, res: Response) => {
    const id = req.query._id as string

    const userToDelete = await this.userService.getUserById(id)
    if (userToDelete?.role === USER_ROLES.SUPER_ADMIN) {
      throw new SuperAdminCannotBeDeleted()
    }

    const response = await this.userService.deleteUserById(id)
    return BaseResponse(res).success(response)
  }

  public inviteUser = async (req: Request<object, object, IUserInvitationRequest>, res: Response) => {
    const { email, firstName, lastName } = req.body

    const user = await this.userService.getUserByEmail(email)
    if (user) {
      throw new UserExistsError()
    }

    const newUser = await this.userService.create({ email, firstName, lastName })

    let token: string | undefined

    if (newUser) {
      token = this.tokenService.generateToken()
    }

    return BaseResponse(res).success({ url: `${CLIENT_URL}/verify?token=${token}`, newUser })
  }

  public register = async (req: Request<object, object, IUserRegisterRequest>, res: Response) => {
    const { email, firstName, lastName, password } = req.body

    const user = await this.userService.getUserByEmail(email)
    if (user) {
      throw new UserExistsError()
    }

    const newUser = await this.userService.create({ email, firstName, lastName, password: CryptService.hash(password) })
    return BaseResponse(res).success(newUser)
  }

  public login = async (req: Request<object, object, IUserLoginRequest>, res: Response) => {
    const { email, password } = req.body

    const user = await this.userService.getUserByEmail(email)
    if (!user || !CryptService.compare(password, user.password)) {
      throw new LoginError()
    }

    const session = await this.userService.saveSession(user._id.toString(), user.role)

    return BaseResponse(res).success({
      session,
      user,
    })
  }

  public regenerateTokens = async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(req.session.userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const newSession = await this.userService.saveSession(req.session.userId, req.session.userRole)
    this.userService.deleteSession(req.session.entityId)
    return BaseResponse(res).success(newSession)
  }

  public logout = async (req: Request, res: Response) => {
    await this.userService.deleteSession(req.session.entityId)

    return BaseResponse(res).success({ logout: true })
  }
}

const userController = new UserController()
export type UserControllerType = typeof userController
export default userController
