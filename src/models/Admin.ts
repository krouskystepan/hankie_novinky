import { Schema, model, Document, models } from 'mongoose'

export type Admin = Document & {
  adminId: string
  username: string
  password: string
}

const Admin = new Schema<Admin>({
  adminId: {
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
})

export default models.Admin || model<Admin>('Admin', Admin)
