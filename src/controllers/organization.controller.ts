import { Request, Response } from 'express'
import OrganizationService from '../services/organization.service'
import BaseResponse from '../utils/BaseResponse'
import { IOrganizationCreateReq } from '../utils/types'

class OrganizationController {
  private organizationService

  constructor() {
    this.organizationService = new OrganizationService()
  }

  public create = async (req: Request<object, object, IOrganizationCreateReq>, res: Response) => {
    const newOrganization = await this.organizationService.create(req.body)

    return BaseResponse(res).success(newOrganization)
  }
}

const organizationController = new OrganizationController()
export type OrganizationControllerType = typeof organizationController
export default organizationController
