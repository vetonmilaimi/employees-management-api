import { JobEventControllerType } from './job-event.controller'
import { OrganizationControllerType } from './organization.controller'
import { ProjectControllerType } from './project.controller'
import { UserControllerType } from './user.controller'

class Controllers {
  private loadController = (controllerName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(`./${controllerName}`)
    return module.default
  }

  get user() {
    return this.loadController('user.controller') as UserControllerType
  }

  get organization() {
    return this.loadController('organization.controller') as OrganizationControllerType
  }

  get project() {
    return this.loadController('project.controller') as ProjectControllerType
  }

  get jobEvent() {
    return this.loadController('job-event.controller') as JobEventControllerType
  }
}

export default new Controllers()
