import { NextFunction } from 'connect'
import TokenService from '../services/token.service'
import UserService from '../services/user.service'
import { Request, Response } from 'express'
import { ExpiredAccessToken, ExpiredRefreshToken, InvalidAccessToken, InvalidRefreshToken } from '../utils/exceptions'
import { UserSession } from '../utils/types'
import { Entity, EntityId } from 'redis-om'
import { USER_ROLES } from '../utils/constants'

class Auth {
  private userService
  private tokenService

  constructor() {
    this.userService = new UserService()
    this.tokenService = new TokenService()
  }

  private getSessionObj = (session: Entity) => {
    return {
      entityId: session[EntityId] as string,
      userId: session.userId as string,
      accessToken: session.accessToken as string,
      refreshToken: session.refreshToken as string,
      accessTokenExp: session.accessTokenExp as number,
      refreshTokenExp: session.refreshTokenExp as number,
      userRole: session.userRole as USER_ROLES,
    }
  }

  public validateAccessToken = async (req: Request, _res: Response, next: NextFunction) => {
    const accessToken = (req.headers['access-token'] as string) || ''

    const session = await this.userService.findSession(accessToken)
    if (!session) {
      throw new InvalidAccessToken()
    }
    const userSession: UserSession = this.getSessionObj(session)

    if (this.tokenService.didTokenExpire(userSession.accessTokenExp)) {
      throw new ExpiredAccessToken()
    }
    req.session = userSession

    next()
  }

  public validateRefreshToken = async (req: Request, _res: Response, next: NextFunction) => {
    const accessToken = (req.headers['access-token'] as string) || ''
    const refreshToken = (req.headers['refresh-token'] as string) || ''

    const session = await this.userService.findSession(accessToken)
    if (!session) {
      throw new InvalidAccessToken()
    }
    const userSession: UserSession = this.getSessionObj(session)

    if (userSession.refreshToken !== refreshToken) {
      throw new InvalidRefreshToken()
    }

    if (this.tokenService.didTokenExpire(userSession.refreshTokenExp)) {
      this.userService.deleteSession(userSession.entityId)
      throw new ExpiredRefreshToken()
    }
    req.session = userSession
    next()
  }
}

export default new Auth()