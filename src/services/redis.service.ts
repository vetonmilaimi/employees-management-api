import { Repository } from 'redis-om'
import { createClient, RedisClientType } from 'redis'

import { REDIS_URL } from '../utils/constants'
import sessionSchema from '../models/redis/session.model'

class Redis {
  private static instance: Redis
  private redisClient: RedisClientType
  private sessionRepo: Repository

  constructor() {
    this.redisClient = createClient({ url: REDIS_URL })
    this.redisClient.connect()
    this.sessionRepo = new Repository(sessionSchema, this.redisClient)
    this.sessionRepo.createIndex()
  }

  public static getInstance(): Redis {
    if (!Redis.instance) {
      Redis.instance = new Redis()
    }
    return Redis.instance
  }

  public getSessionRepo() {
    return this.sessionRepo
  }
}

export default Redis
