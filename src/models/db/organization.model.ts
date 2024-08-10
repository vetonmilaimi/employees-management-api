import { model, Schema } from 'mongoose'
import { IOrganization } from '../../utils/types'

const schema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    admins: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  },
  { timestamps: true }
)

const Organization = model<IOrganization>('organizations', schema)

export default Organization
