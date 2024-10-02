import OrganizationModel from '../models/db/organization.model'
import { IOrganizationCreateReq } from '../utils/types'

class OrganizationService {
  public create = async (data: IOrganizationCreateReq, managerId: string) => {
    return await OrganizationModel.create({ ...data, users: [managerId] })
  }

  public findById = async (organizationId: string) => {
    return await OrganizationModel.findById(organizationId).lean().exec()
  }

  public findByIdAndUpdate = async (organizationId: string, data: object) => {
    return await OrganizationModel.findByIdAndUpdate(organizationId, data).lean().exec()
  }

  public findOne = async (data: object) => {
    return await OrganizationModel.findOne(data).lean().exec()
  }

  public findByUserId = async (userId: string) => {
    return await OrganizationModel.findOne({
      users: {
        $in: [userId],
      },
    })
      .lean()
      .exec()
  }

  public delete = async (organizationId: string) => {
    return await OrganizationModel.findByIdAndDelete(organizationId)
  }

  public listOrganizations = async () => {
    return await OrganizationModel.find().lean().exec()
  }
}

export default OrganizationService
