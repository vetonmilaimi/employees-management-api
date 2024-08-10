import { Request, Response } from 'express'
import OrganizationService from '../services/organization.service'
import BaseResponse from '../utils/BaseResponse'
import { IOrganizationCreateReq } from '../utils/types'
import UserService from '../services/user.service'
import { OneOrganizationAllowed } from '../utils/exceptions'

class OrganizationController {
  private organizationService
  private userService

  constructor() {
    this.organizationService = new OrganizationService()
    this.userService = new UserService()
  }

  public create = async (req: Request<object, object, IOrganizationCreateReq>, res: Response) => {
    const organization = await this.organizationService.findByAdminId(req.session.userId)

    if (organization) {
      throw new OneOrganizationAllowed()
    }

    const newOrganization = await this.organizationService.create(req.body, req.session.userId)

    return BaseResponse(res).success(newOrganization)
  }
}

const organizationController = new OrganizationController()
export type OrganizationControllerType = typeof organizationController
export default organizationController
