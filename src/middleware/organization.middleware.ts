import { NextFunction, Request, Response } from 'express'
import OrganizationService from '../services/organization.service'
import { OrganizationDoesNotExist } from '../utils/exceptions'

class Organization {
  private organizationService

  constructor() {
    this.organizationService = new OrganizationService()
  }

  public validateOrganization = async (req: Request, _res: Response, next: NextFunction) => {
    const id = req.headers['organization-id'] as string
    const organization = await this.organizationService.findById(id)
    if (!organization) {
      throw new OrganizationDoesNotExist()
    }

    organization._id = organization._id.toString()
    req.organization = organization
    next()
  }
}

export default new Organization()
