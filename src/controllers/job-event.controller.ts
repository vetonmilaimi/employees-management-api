import { Request, Response } from 'express'
import JobEventService from '../services/job-event.service'
import { IJobEventCreateReq } from '../utils/types'
import BaseResponse from '../utils/BaseResponse'
import { JobEventNotFoundError } from '../utils/exceptions'

class JobEventController {
  private jobEventService

  constructor() {
    this.jobEventService = new JobEventService()
  }

  // TODO: Check this
  public create = async (req: Request<object, object, IJobEventCreateReq>, res: Response) => {
    return BaseResponse(res).success(await this.jobEventService.create(req.body, req.organization._id))
  }

  public update = async (req: Request<object, object, IJobEventCreateReq, { _id: string }>, res: Response) => {
    const jobEvent = await this.jobEventService.findById(req.query._id)

    if (!jobEvent) {
      throw new JobEventNotFoundError()
    }

    return BaseResponse(res).success(await this.jobEventService.create(req.body, req.organization._id))
  }

  public list = async (req: Request, res: Response) => {
    return BaseResponse(res).success(await this.jobEventService.listJobEvents(req.organization._id))
  }

  public findById = async (req: Request<object, object, object, { _id: string }>, res: Response) => {
    const jobEvent = await this.jobEventService.findById(req.query._id)

    if (!jobEvent) {
      throw new JobEventNotFoundError()
    }

    BaseResponse(res).success(jobEvent)
  }

  public delete = async (req: Request<object, object, object, { _id: string }>, res: Response) => {
    const jobEvent = await this.jobEventService.findById(req.query._id)

    if (!jobEvent) {
      throw new JobEventNotFoundError()
    }

    return BaseResponse(res).success(await this.jobEventService.delete(jobEvent._id))
  }
}

const jobEventController = new JobEventController()
export type JobEventControllerType = typeof jobEventController
export default jobEventController
