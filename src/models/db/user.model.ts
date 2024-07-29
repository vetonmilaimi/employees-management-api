import { model, Schema } from 'mongoose'
import { EMAIL_REGEX, USER_ROLES } from '../../utils/constants'
import { IUser } from '../../utils/types'

const schema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return EMAIL_REGEX.test(v)
        },
        message: 'Please enter a valid email',
      },
      match: [EMAIL_REGEX, 'Please fill a valid email address'],
    },
    /*
      Default password null because of invitations from super admin
    */
    password: { type: String, default: null },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      /*
        Because for now we don't need user the default role 
        should be admin because it's the lowest role
      */
      default: USER_ROLES.ADMIN,
    },
    activated: { type: Boolean, default: false },
    activateToken: { type: String, default: null },

    __v: { type: Number, select: false },
  },
  { timestamps: true }
)

const User = model<IUser>('users', schema)

export default User
