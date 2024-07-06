import UserModel from '../models/db/user.model'
import { IUserRegister } from '../utils/types'

class UserService {
  public getUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email }).lean().exec()
  }

  public create = async (data: IUserRegister) => {
    return await UserModel.create(data)
  }
}

export default UserService
