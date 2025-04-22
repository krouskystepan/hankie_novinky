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
import Link from 'next/link'
import { authOptions } from '@/lib/authOptions'

const Post = async ({
  postId,
  title,
  description,
  tag,
  createdBy,
  createdAt,
}: Omit<TPost, 'images'>) => {
  const session = await getServerSession(authOptions)

  return (
    <Card className="relative size-full gap-2">
      <Badge
        className={`absolute -top-4 right-1/2 translate-x-1/2 text-xl text-black px-4 tracking-wider ${getStyleByTag(
          tag
        )}`}
      >
        {getTagText(tag)}
      </Badge>
      {(session?.user.name === createdBy || session?.user.role === 'admin') && (
        <AdminButtons postId={postId} />
      )}

      <CardHeader className="mt-2 text-center">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="size-full">
        <p className="text-center line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex gap-4 flex-col">
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="hidden sm:flex text-xl tracking-wide cursor-pointer w-full border text-center"
        >
          <Link href={`/prispevek/${postId}`} className=" text-center">
            {'====> taDY ViC <===='}
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="sm:hidden text-xl tracking-wide cursor-pointer w-full border text-center"
        >
          <Link href={`/prispevek/${postId}`} className=" text-center">
            {'taDY ViC'}
          </Link>
        </Button>
        <div className="text-center flex justify-between items-center w-full tracking-wider">
          <p>vYTVořiL: {createdBy}</p>
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString('cs-CZ', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Post
