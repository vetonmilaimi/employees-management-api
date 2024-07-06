import { Request, Response } from 'express'
import BaseResponse from '../utils/BaseResponse'
import { IUserRegister } from '../utils/types'
import UserService from '../services/user.service'
import CryptService from '../services/crypt.service'

class UserController {
  private userService

  constructor() {
    this.userService = new UserService()
  }

  public me = async (req: Request, res: Response) => {
    return BaseResponse(res).success({})
  }

  public register = async (req: Request<object, object, IUserRegister>, res: Response) => {
    const { email, firstName, lastName, password } = req.body

    const newUser = await this.userService.create({ email, firstName, lastName, password: CryptService.hash(password) })
    return BaseResponse(res).success(newUser)
  }
}

const userController = new UserController()
export type UserControllerType = typeof userController
export default userController
