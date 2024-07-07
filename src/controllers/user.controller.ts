import { Request, Response } from 'express'
import BaseResponse from '../utils/BaseResponse'
import { IUserLoginRequest, IUserRegisterRequest } from '../utils/types'
import UserService from '../services/user.service'
import CryptService from '../services/crypt.service'
import { LoginError, UserNotFoundError } from '../utils/exceptions'

class UserController {
  private userService

  constructor() {
    this.userService = new UserService()
  }

  public me = async (req: Request, res: Response) => {
    return BaseResponse(res).success({})
  }

  public register = async (req: Request<object, object, IUserRegisterRequest>, res: Response) => {
    const { email, firstName, lastName, password } = req.body

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
