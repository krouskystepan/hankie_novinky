import { Schema, model, Document, models } from 'mongoose'

export type Post = Document & {
  postId: string
  title: string
  description: string
  images: string[]
  tag: string
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
    tag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default models.Post || model<Post>('Post', PostSchema)
