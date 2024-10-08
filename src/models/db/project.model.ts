import { model, Schema } from 'mongoose'
import { IProject } from '../../utils/types'

const schema = new Schema(
  {
    name: { type: String, required: true },
    organization: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
)

const Project = model<IProject>('projects', schema)

export default Project
