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

  public create = async (req: Request<object, object, IJobEventCreateReq>, res: Response) => {
    return BaseResponse(res).success(await this.jobEventService.create(req.body, req.organization._id))
  }

  public update = async (req: Request<object, object, IJobEventCreateReq, { _id: string }>, res: Response) => {
    const jobEvent = await this.jobEventService.findById(req.query._id)

    if (!jobEvent) {
      throw new JobEventNotFoundError()
    }

    const update: Record<string, unknown> = { ...req.body }
    const unset: Record<string, unknown> = {}
    if (!('start' in req.body) || req.body.start === undefined) unset.start = ''
    if (!('end' in req.body) || req.body.end === undefined) unset.end = ''

    let updateQuery: Record<string, unknown>
    if (Object.keys(unset).length > 0) {
      updateQuery = { $set: update, $unset: unset }
    } else {
      updateQuery = update
    }

    return BaseResponse(res).success(await this.jobEventService.findByIdAndUpdate(req.query._id, updateQuery as IJobEventCreateReq))
  }

  public list = async (req: Request<object, object, object, { project?: string }>, res: Response) => {
    const projectId = req.query.project

    if (projectId) {
      return BaseResponse(res).success(await this.jobEventService.listJobEventsByProject(projectId))
    }

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

  public timeOnProject = async (req: Request<object, object, object, { _id: string }>, res: Response) => {
    const jobEvents = await this.jobEventService.listJobEventsByProject(req.query._id)

    if (!jobEvents || jobEvents.length === 0) {
      throw new JobEventNotFoundError()
    }

    const now = new Date()
    let totalMilliseconds = 0

    for (const event of jobEvents) {
      if (event.start) {
        const start = new Date(event.start)
        const end = event.end ? new Date(event.end) : now
        const effectiveEnd = end > now ? now : end

        const duration = effectiveEnd.getTime() - start.getTime()
        totalMilliseconds += duration
      }
    }
    const totalMinutes = Math.floor(totalMilliseconds / (1000 * 60))
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return BaseResponse(res).success({ hours, minutes })
  }
}

const jobEventController = new JobEventController()
export type JobEventControllerType = typeof jobEventController
export default jobEventController
