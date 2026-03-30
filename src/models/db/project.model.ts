import { model, Schema } from 'mongoose'
import { IProject } from '../../utils/types'
import { PROJECT_STATUS } from '../../utils/constants'
import { required } from 'joi'

const schema = new Schema(
  {
    name: { type: String, required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'organizations' },
    description: { type: String, required: false },
    employees: [{ type: Schema.Types.ObjectId, ref: 'users', required: false }],
    status: {
      type: String,
      enum: PROJECT_STATUS,
      default: PROJECT_STATUS.TODO,
      required: true,
    },
  },
  { timestamps: true }
)

const Project = model<IProject>('projects', schema)

export default Project
