import ProjectModel from '../models/db/project.model'
import { IProjectCreateReq } from '../utils/types'

class ProjectService {
  public create = async (data: IProjectCreateReq, organizationId: string) => {
    return await ProjectModel.create({ ...data, organization: organizationId })
  }

  public findById = async (projectId: string) => {
    return await ProjectModel.findById(projectId).lean().exec()
  }

  public findByIdAndUpdate = async (projectId: string, data: IProjectCreateReq) => {
    return await ProjectModel.findByIdAndUpdate(projectId, data).lean().exec()
  }

  public findOne = async (data: object) => {
    return await ProjectModel.findOne(data).lean().exec()
  }

  public listProjects = async (organizationId: string) => {
    return await ProjectModel.find({ organization: organizationId }).lean().exec()
  }

  public delete = async (projectId: string) => {
    return await ProjectModel.findByIdAndDelete(projectId)
  }
}

export default ProjectService
