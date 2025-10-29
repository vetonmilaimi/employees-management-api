import { model, Schema } from 'mongoose'
import { IProject } from '../../utils/types'
import { PROJECT_STATUS } from '../../utils/constants'

const schema = new Schema(
  {
    name: { type: String, required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'organizations' },
    description: { type: String, required: false },
    status: {
      type: String,
      enum: PROJECT_STATUS,
      default: 'todo',
      required: true,
    },
  },
  { timestamps: true }
)

const Project = model<IProject>('projects', schema)

export default Project
