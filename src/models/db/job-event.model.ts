import { model, Schema } from 'mongoose'
import { IJobEvent } from '../../utils/types'
import { JOB_EVENT_STATUS } from '../../utils/constants'

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    project: { type: Schema.Types.ObjectId, ref: 'projects' },
    employees: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    manager: { type: Schema.Types.ObjectId, ref: 'users' },
    organization: { type: Schema.Types.ObjectId, ref: 'organizations' },
    start: { type: Date },
    end: { type: Date },
    status: {
      type: String,
      enum: JOB_EVENT_STATUS,
      default: 'todo',
      required: true,
    },
  },
  { timestamps: true }
)

const JobEvent = model<IJobEvent>('job-events', schema)

export default JobEvent
