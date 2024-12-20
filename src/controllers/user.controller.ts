import { Request, Response } from 'express'
import BaseResponse from '../utils/BaseResponse'
import { IUserCreatePasswordRequest, IUserInvitationRequest, IUserLoginRequest, IUserRegisterRequest } from '../utils/types'
import UserService from '../services/user.service'
import CryptService from '../services/crypt.service'
import { LoginError, AdminCannotBeDeleted, UserExistsError, UserNotFoundError, UserNotActivated } from '../utils/exceptions'
import { USER_ROLES } from '../utils/constants'
import TokenService from '../services/token.service'
import MailerService from '../services/mailer.service'

class UserController {
  private userService
  private tokenService
  private mailerService

  constructor() {
    this.userService = new UserService()
    this.tokenService = new TokenService()
    this.mailerService = new MailerService()
  }

  public me = async (req: Request, res: Response) => {
    //TODO: Handle this response
    return BaseResponse(res).success({})
  }

  public list = async (req: Request, res: Response) => {
    const users = await this.userService.list()

    return BaseResponse(res).success(users)
  }

  public delete = async (req: Request, res: Response) => {
    const id = req.query._id as string

    const userToDelete = await this.userService.getUserById(id)
    if (userToDelete?.role === USER_ROLES.ADMIN) {
      throw new AdminCannotBeDeleted()
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

    const token = this.tokenService.jwtSign({ email }, { expiresIn: 60 * 60 * 24 * 7 }) // 7 days validation

    const newUser = await this.userService.create({ email, firstName, lastName, activateToken: token, role: USER_ROLES.MANAGER })

    await this.mailerService.sendVerificationEmail(email, token, firstName)

    return BaseResponse(res).success(newUser)
  }

  public activate = async (req: Request<object, object, IUserCreatePasswordRequest>, res: Response) => {
    const { email } = req.activate
    const { password } = req.body

    const user = await this.userService.getUserByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    const updatedUser = await this.userService.createPassword(user._id, CryptService.hash(password))

    return BaseResponse(res).success(updatedUser)
  }

  public register = async (req: Request<object, object, IUserRegisterRequest>, res: Response) => {
    const { email, firstName, lastName, password } = req.body

    const user = await this.userService.getUserByEmail(email)
    if (user) {
      throw new UserExistsError()
    }

    const newUser = await this.userService.create({ email, firstName, lastName, password: CryptService.hash(password), role: USER_ROLES.USER })
    return BaseResponse(res).success(newUser)
  }

  public login = async (req: Request<object, object, IUserLoginRequest>, res: Response) => {
    const { email, password } = req.body

    const user = await this.userService.getUserByEmail(email)

    if (!user?.activated) {
      throw new UserNotActivated()
    }

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
