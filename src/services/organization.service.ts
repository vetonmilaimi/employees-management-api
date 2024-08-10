import OrganizationModel from '../models/db/organization.model'
import { IOrganizationCreateReq } from '../utils/types'

class OrganizationService {
  public create = async (data: IOrganizationCreateReq, adminId: string) => {
    return await OrganizationModel.create({ ...data, admins: [adminId] })
  }

  public findById = async (organizationId: string) => {
    return await OrganizationModel.findById(organizationId)
  }

  public findOne = async (data: object) => {
    return await OrganizationModel.findOne(data)
  }

  public findByAdminId = async (adminId: string) => {
    return await OrganizationModel.findOne({
      admins: {
        $in: [adminId],
      },
    })
  }

  public delete = async (organizationId: string) => {
    return await OrganizationModel.findByIdAndDelete(organizationId)
  }

  public listOrganizations = async () => {
    return await OrganizationModel.find().lean().exec()
  }
}

export default OrganizationService
