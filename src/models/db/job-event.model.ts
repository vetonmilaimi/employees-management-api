import { model, Schema } from 'mongoose'
import { IJobEvent } from '../../utils/types'

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    project: { type: Schema.Types.ObjectId, ref: 'projects' },
    employees: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    manager: { type: Schema.Types.ObjectId, ref: 'users' },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { timestamps: true }
)

const JobEvent = model<IJobEvent>('job-events', schema)

export default JobEvent
