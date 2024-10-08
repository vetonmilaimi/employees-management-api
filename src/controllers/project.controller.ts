import { Request, Response } from 'express'
import ProjectService from '../services/project.service'
import { IProjectCreateReq } from '../utils/types'
import BaseResponse from '../utils/BaseResponse'
import { ProjectNotFoundError } from '../utils/exceptions'

class ProjectController {
  private projectService

  constructor() {
    this.projectService = new ProjectService()
  }

  public create = async (req: Request<object, object, IProjectCreateReq>, res: Response) => {
    const organizationId = req.organization._id
    return BaseResponse(res).success(await this.projectService.create(req.body, organizationId))
  }

  public update = async (req: Request<object, object, IProjectCreateReq, { _id: string }>, res: Response) => {
    const project = await this.projectService.findById(req.query._id)

    if (!project) {
      throw new ProjectNotFoundError()
    }

    return BaseResponse(res).success(await this.projectService.findByIdAndUpdate(project._id, req.body))
  }

  public list = async (req: Request, res: Response) => {
    return BaseResponse(res).success(await this.projectService.listProjects(req.organization._id))
  }

  public findById = async (req: Request<object, object, object, { _id: string }>, res: Response) => {
    const project = await this.projectService.findById(req.query._id)

    if (!project) {
      throw new ProjectNotFoundError()
    }

    BaseResponse(res).success(project)
  }

  public delete = async (req: Request<object, object, object, { _id: string }>, res: Response) => {
    const project = await this.projectService.findById(req.query._id)

    if (!project) {
      throw new ProjectNotFoundError()
    }

    return BaseResponse(res).success(await this.projectService.delete(project._id))
  }
}

const projectController = new ProjectController()
export type ProjectControllerType = typeof projectController
export default projectController
