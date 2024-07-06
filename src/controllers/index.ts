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
}

export default new Controllers()
