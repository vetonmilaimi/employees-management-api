import { model, Schema } from 'mongoose'

const schema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true }
)

const Organization = model<object>('organizations', schema)

export default Organization
