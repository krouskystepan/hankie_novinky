import React from 'react'
import { Button } from './ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'
import { Badge } from './ui/badge'
import { TPost } from '@/constants/types'
import { getStyleByTag, getTagText } from '@/lib/utils'
import AdminButtons from './AdminButtons'
import { getServerSession } from 'next-auth'

const Post = async ({
  postId,
  title,
  description,
  tag,
}: Omit<TPost, 'images'>) => {
  const session = await getServerSession()

  return (
    <Card className="relative size-full gap-2">
      <Badge
        className={`absolute -top-4 right-1/2 translate-x-1/2 text-xl text-black px-4 tracking-wider ${getStyleByTag(
          tag
        )}`}
      >
        {getTagText(tag)}
      </Badge>
      {session?.user?.name && <AdminButtons postId={postId} />}
      <CardHeader className="mt-2 text-center">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="size-full">
        <p className="text-center line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          size={'lg'}
          className={'cursor-pointer w-full text-xl border -tracking-wide'}
        >
          {'====> taDY ViC <===='}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Post
