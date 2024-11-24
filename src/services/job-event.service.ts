import JobEventModel from '../models/db/job-event.model'
import { IJobEventCreateReq } from '../utils/types'

class JobEventService {
  public create = async (data: IJobEventCreateReq, organizationId: string) => {
    return await JobEventModel.create({ ...data, organization: organizationId })
  }

  public findById = async (jobEventId: string) => {
    return await JobEventModel.findById(jobEventId).lean().exec()
  }

  public findByIdAndUpdate = async (jobEventId: string, data: IJobEventCreateReq) => {
    return await JobEventModel.findByIdAndUpdate(jobEventId, data).lean().exec()
  }

  public findOne = async (data: object) => {
    return await JobEventModel.findOne(data).lean().exec()
  }

  public listJobEvents = async (organizationId: string) => {
    return await JobEventModel.find({ organization: organizationId }).lean().exec()
  }

  public listJobEventsByProject = async (projectId: string) => {
    return await JobEventModel.find({ project: projectId }).lean().exec()
  }

  public listJobEventsByManager = async (managerId: string) => {
    return await JobEventModel.find({ manager: managerId }).lean().exec()
  }

  public delete = async (jobEventId: string) => {
    return await JobEventModel.findByIdAndDelete(jobEventId)
  }
}

export default JobEventService
