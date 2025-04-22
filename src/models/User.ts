import { Schema, model, Document, models } from 'mongoose'

export type User = Document & {
  userId: string
  username: string
  password: string
  role: string
}

const User = new Schema<User>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  },
})

export default models.User || model<User>('User', User)
