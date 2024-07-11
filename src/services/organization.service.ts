import OrganizationModel from '../models/db/organization.model'
import { IOrganizationCreateReq } from '../utils/types'

class OrganizationService {
  public create = async (data: IOrganizationCreateReq) => {
    return await OrganizationModel.create(data)
  }

  public findById = async (organizationId: string) => {
    return await OrganizationModel.findById(organizationId)
  }

  public delete = async (organizationId: string) => {
    return await OrganizationModel.findByIdAndDelete(organizationId)
  }

  public listOrganizations = async () => {
    return await OrganizationModel.find()
  }
}

export default OrganizationService
