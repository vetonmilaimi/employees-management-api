import { Request, Response } from 'express'
import OrganizationService from '../services/organization.service'
import BaseResponse from '../utils/BaseResponse'
import { IEmployeeAddReq, IOrganizationCreateReq } from '../utils/types'
import { CannotFindOrganization, OneOrganizationAllowed, UserExistsOnOrganizationError, UserNotFoundError } from '../utils/exceptions'
import UserService from '../services/user.service'
import { USER_ROLES } from '../utils/constants'
import TokenService from '../services/token.service'
import MailerService from '../services/mailer.service'

class OrganizationController {
  private organizationService
  private userService
  private tokenService
  private mailerService

  constructor() {
    this.organizationService = new OrganizationService()
    this.userService = new UserService()
    this.tokenService = new TokenService()
    this.mailerService = new MailerService()
  }

  public listOrganizations = async (req: Request, res: Response) => {
    const organizations = await this.organizationService.listPopulatedOrganizationsWithManager()

    return BaseResponse(res).success(organizations)
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
    // await this.mailerService.sendVerificationEmail(email, token)

    organization.users.push(newUser._id)
    return BaseResponse(res).success(await this.organizationService.findByIdAndUpdate(organization._id, organization))
  }

  public listEmployees = async (req: Request, res: Response) => {
    const organization = await this.organizationService.findByUserId(req.session.userId)

    if (!organization) {
      throw new CannotFindOrganization()
    }

    const employees = await this.userService.list({ _id: { $in: organization.users } })

    return BaseResponse(res).success(employees)
  }

  public deleteEmployee = async (req: Request<object, object, object, { _id: string }>, res: Response) => {
    const employee = await this.userService.getUserById(req.query._id)

    if (!employee) {
      throw new UserNotFoundError()
    }

    if (employee.role === USER_ROLES.USER) {
      await this.userService.deleteUserById(employee._id)
    }

    return BaseResponse(res).success(await this.organizationService.removeUserFromOrganization(req.organization._id, employee._id))
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
      return BaseResponse(res).success(null)
      // throw new CannotFindOrganization()
    }

    return BaseResponse(res).success(organization)
  }
}

const organizationController = new OrganizationController()
export type OrganizationControllerType = typeof organizationController
export default organizationController
