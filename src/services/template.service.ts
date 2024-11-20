import path from 'path'
import ejs from 'ejs'

type Keys = keyof typeof TemplateService.TEMPLATE_NAMES

class TemplateService {
  public static TEMPLATE_NAMES = {
    activateAccount: 'activate-account',
  } as const

  public static async getTemplate(template: (typeof TemplateService.TEMPLATE_NAMES)[Keys], data: object) {
    const filePath = path.dirname(__dirname) + `/views/email-templates/${template}.ejs`
    return await ejs.renderFile(filePath, data)
  }
}

export default TemplateService
