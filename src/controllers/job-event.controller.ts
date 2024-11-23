import { Request, Response } from 'express'
import JobEventService from '../services/job-event.service'
import { IJobEventCreateReq } from '../utils/types'
import BaseResponse from '../utils/BaseResponse'

class JobEventController {
  private jobEventService

  constructor() {
    this.jobEventService = new JobEventService()
  }

  // TODO: Check this
  public create = async (req: Request<object, object, IJobEventCreateReq>, res: Response) => {
    return BaseResponse(res).success(await this.jobEventService.create(req.body, req.organization._id))
  }
}

const jobEventController = new JobEventController()
export type JobEventControllerType = typeof jobEventController
export default jobEventController
