import { connect } from 'mongoose'
import { DATABASE_URL } from '../utils/constants'

class Database {
  static async connect() {
    try {
      await connect(DATABASE_URL)
      console.log('DB connected')
    } catch (err) {
      console.error('Error connection to DB', err)
    }
  }
}

export default Database
