import ProjectModel from '../models/db/project.model'
import JobEventModel from '../models/db/job-event.model'
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

  public addEmployeesToProject = async (projectId: string, employeeIds: string[]) => {
    if (employeeIds.length === 0) {
      return
    }

    return await ProjectModel.findByIdAndUpdate(
      projectId,
      { $addToSet: { employees: { $each: employeeIds } } },
      { new: true }
    )
      .lean()
      .exec()
  }

  public findOne = async (data: object) => {
    return await ProjectModel.findOne(data).lean().exec()
  }

  public listProjects = async (organizationId: string) => {
    return await ProjectModel.find({ organization: organizationId }).lean().exec()
  }

  public delete = async (projectId: string) => {
    // remove all job events that belong to this project first
    await JobEventModel.deleteMany({ project: projectId }).exec()

    return await ProjectModel.findByIdAndDelete(projectId)
  }
}

export default ProjectService
