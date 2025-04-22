import { Schema, model, Document, models } from 'mongoose'

export type Post = Document & {
  postId: string
  title: string
  description: string
  images: string[]
  video?: string
  tag: string
  createdBy: string
}

const PostSchema = new Schema<Post>(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    video: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default models.Post || model<Post>('Post', PostSchema)
