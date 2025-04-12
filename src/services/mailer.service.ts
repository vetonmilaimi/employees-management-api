import nodemailer from 'nodemailer'
import { CLIENT_URL, MAILER_HOST, MAILER_PASS, MAILER_PORT, MAILER_SECURE, MAILER_USER, USER_ROLES } from '../utils/constants'
import TemplateService from './template.service'

class MailerService {
  private static SENDER = 'EMS Veton Milaimi'
  private static SUBJECTS = {
    activateAccount: 'Activate your account',
    // resetPassword: 'Reset your password',
  } as const

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    host: MAILER_HOST,
    port: Number(MAILER_PORT),
    secure: MAILER_SECURE,
    auth: {
      user: MAILER_USER,
      pass: MAILER_PASS,
    },
  })

  public sendVerificationEmail = async (emailTo: string, verificationToken: string, first_name: string, role: USER_ROLES) => {
    const template = await TemplateService.getTemplate(TemplateService.TEMPLATE_NAMES.activateAccount, {
      url: `${CLIENT_URL}`,
      token: verificationToken,
      first_name,
      role,
    })

    return await this.transporter.sendMail({
      from: 'EMS Veton Milaimi',
      to: emailTo,
      subject: 'Account Verification EMS Veton Milaimi',
      text: `To verify your account pease visit this link: ${CLIENT_URL}/activate?token=${verificationToken}`,
      html: template,
    })
  }
}

export default MailerService
