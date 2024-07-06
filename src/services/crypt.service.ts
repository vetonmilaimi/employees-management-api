import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../utils/constants'

class CryptService {
  public static hash(input: string | Buffer) {
    const salt = bcrypt.genSaltSync(+SALT_ROUNDS)
    return bcrypt.hashSync(input, salt)
  }

  public static compare(data: string, hash: string) {
    return bcrypt.compareSync(data, hash)
  }
}

export default CryptService
