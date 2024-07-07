import { connect } from 'mongoose'
import { DATABASE_URL } from '../utils/constants'
import UserService from '../services/user.service'

class Database {
  static async connect() {
    try {
      await connect(DATABASE_URL)
      await UserService.checkSuperAdmin()
      console.log('DB connected')
    } catch (err) {
      console.error('Error connection to DB', err)
    }
  }
}

export default Database
