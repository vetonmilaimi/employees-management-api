import nodemailer from 'nodemailer'
import { CLIENT_URL, MAILER_HOST, MAILER_PASS, MAILER_PORT, MAILER_SECURE, MAILER_USER } from '../utils/constants'

class MailerService {
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

  public sendVerificationEmail = async (emailTo: string, verificationToken: string) => {
    return await this.transporter.sendMail({
      from: 'EMS Veton Milaimi',
      to: emailTo,
      subject: 'Account Verification EMS Veton Milaimi',
      text: `To verify your account pease visit this link: ${CLIENT_URL}/activate?token=${verificationToken}`,
      html: `<div>
        <b>To verify your account pease press the button below</b>
        <a href="${CLIENT_URL}/activate?token=${verificationToken}">Verify Account</a>
      <div>`,
    })
  }
}

export default MailerService
