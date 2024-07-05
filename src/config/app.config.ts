import Database from './db.config'

class AppConfig {
  static async startup() {
    await Database.connect()
  }
}

export default AppConfig
