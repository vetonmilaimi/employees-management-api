import { Request, Response } from 'express'
import OrganizationService from '../services/organization.service'
import BaseResponse from '../utils/BaseResponse'
import { IOrganizationCreateReq } from '../utils/types'
import { CannotFindOrganization, OneOrganizationAllowed } from '../utils/exceptions'

class OrganizationController {
  private organizationService

  constructor() {
    this.organizationService = new OrganizationService()
  }

  public create = async (req: Request<object, object, IOrganizationCreateReq>, res: Response) => {
    const organization = await this.organizationService.findByManagerId(req.session.userId)

    if (organization) {
      throw new OneOrganizationAllowed()
    }

    const response = await this.organizationService.create(req.body, req.session.userId)

    return BaseResponse(res).success(response)
  }

  public update = async (req: Request<object, object, IOrganizationCreateReq>, res: Response) => {
    const managerId = req.session.userId

    const organization = await this.organizationService.findByManagerId(managerId)

    if (!organization) {
      throw new CannotFindOrganization()
    }

    return BaseResponse(res).success(await this.organizationService.findByIdAndUpdate(organization._id, req.body))
  }

  // public delete = async (req: Request, res: Response) => {
  //   const id = req.query._id as string
  //   if (!(await this.organizationService.findById(id))) {
  //     throw new OrganizationDoesNotExist()
  //   }

  //   const response = await this.organizationService.delete(id)

  //   return BaseResponse(res).success(response)
  // }

  public about = async (req: Request, res: Response) => {
    const organization = await this.organizationService.findByManagerId(req.session.userId)

    if (!organization) {
      throw new CannotFindOrganization()
    }

    return BaseResponse(res).success(organization)
  }
}

const organizationController = new OrganizationController()
export type OrganizationControllerType = typeof organizationController
export default organizationController
