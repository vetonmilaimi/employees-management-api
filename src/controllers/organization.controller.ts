import { Request, Response } from 'express'
import OrganizationService from '../services/organization.service'
import BaseResponse from '../utils/BaseResponse'
import { IEmployeeAddReq, IOrganizationCreateReq } from '../utils/types'
import { CannotFindOrganization, OneOrganizationAllowed, UserExistsOnOrganizationError } from '../utils/exceptions'
import UserService from '../services/user.service'
import { USER_ROLES } from '../utils/constants'
import TokenService from '../services/token.service'

class OrganizationController {
  private organizationService
  private userService
  private tokenService

  constructor() {
    this.organizationService = new OrganizationService()
    this.userService = new UserService()
    this.tokenService = new TokenService()
  }

  public create = async (req: Request<object, object, IOrganizationCreateReq>, res: Response) => {
    const organization = await this.organizationService.findByUserId(req.session.userId)

    if (organization) {
      throw new OneOrganizationAllowed()
    }

    const response = await this.organizationService.create(req.body, req.session.userId)

    return BaseResponse(res).success(response)
  }

  public update = async (req: Request<object, object, IOrganizationCreateReq>, res: Response) => {
    const managerId = req.session.userId

    const organization = await this.organizationService.findByUserId(managerId)

    if (!organization) {
      throw new CannotFindOrganization()
    }

    return BaseResponse(res).success(await this.organizationService.findByIdAndUpdate(organization._id, req.body))
  }

  public addEmployee = async (req: Request<object, object, IEmployeeAddReq>, res: Response) => {
    const { email, firstName, lastName } = req.body
    const organization = await this.organizationService.findByUserId(req.session.userId)

    const existingUser = await this.userService.getUserByEmail(email)

    if (!organization) {
      throw new CannotFindOrganization()
    }

    if (existingUser) {
      const employeeOrganization = await this.organizationService.findByUserId(existingUser._id)
      if (employeeOrganization) {
        throw new UserExistsOnOrganizationError()
      }

      organization.users.push(existingUser._id)
      return BaseResponse(res).success(await this.organizationService.findByIdAndUpdate(organization._id, organization))
    }

    const token = this.tokenService.jwtSign({ email }, { expiresIn: 60 * 60 * 24 * 7 }) // 7 days validation

    const newUser = await this.userService.create({ email, firstName, lastName, role: USER_ROLES.USER, activateToken: token })
    organization.users.push(newUser._id)
    return BaseResponse(res).success(await this.organizationService.findByIdAndUpdate(organization._id, organization))
  }

  // public delete = async (req: Request, res: Response) => {
  //   const id = req.query._id as string
  //   if (!(await this.organizationService.findById(id))) {
  //     throw new OrganizationDoesNotExist()
  //   }

  //   const response = await this.organizationService.delete(id)

  //   return BaseResponse(res).success(response)
  // }

  public about = async (req: Request, res: Response) => {
    const organization = await this.organizationService.findByUserId(req.session.userId)

    if (!organization) {
      throw new CannotFindOrganization()
    }

    return BaseResponse(res).success(organization)
  }
}

const organizationController = new OrganizationController()
export type OrganizationControllerType = typeof organizationController
export default organizationController
