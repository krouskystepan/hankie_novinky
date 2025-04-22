export type TTag =
  | 'novinky'
  | 'zajimavosti'
  | 'outfity'
  | 'tipy'
  | 'zabava'
  | 'jine'

export type TPost = {
  postId: string
  title: string
  description: string
  createdBy: string
  createdAt: string
  images: string[]
  video?: string
  tag: TTag
}
