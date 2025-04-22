import { getPostById, getPostsByTag } from '@/actions/post.action'
import Container from '@/components/Container'
import Gallery from '@/components/Gallery'
import Post from '@/components/Post'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getStyleByTag, getTagText } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const PostPage = async ({
  params,
}: {
  params: Promise<{
    postId: string
  }>
}) => {
  const { postId } = await params

  const post = await getPostById(postId)

  if (!post) notFound()

  const otherPosts = await getPostsByTag(post.tag)

  const filteredOtherPosts = otherPosts.filter(
    (otherPost) => otherPost.postId !== post.postId
  )

  return (
    <Container
      className="bg-custom-yellow flex flex-1 py-8"
      innerClassName="flex flex-1 flex-col justify-between"
    >
      <main className="spay-ce-y-8">
        <section
          className={`px-6 font-slackey text-custom-purple gap-6 ${
            post.images.some((img) => img && img.trim() !== '')
              ? 'grid grid-cols-1 sm:grid-cols-2'
              : 'flex flex-col items-center justify-center text-center max-w-2xl mx-auto'
          }`}
        >
          {post.images.some((img) => img && img.trim() !== '') && (
            <Gallery images={post.images} />
          )}

          <div className="w-full">
            <div className="my-2 w-full flex flex-col min-[400px]:flex-row gap-3 justify-center">
              <Button
                asChild
                variant={'secondary'}
                className="w-full min-[400px]:w-4/6"
              >
                <Link
                  href={'/'}
                  className="text-lg font-semibold tracking-wider"
                >
                  ZPatKy nA ZPaTeK
                </Link>
              </Button>
              <Badge
                className={`border text-lg border-black w-full min-[400px]:w-fit ${getStyleByTag(
                  post.tag
                )}`}
              >
                {getTagText(post.tag)}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-wider text-custom-red mt-4 mb-6">
              {post.title}
            </h1>

            <p className="text-xl tracking-wider leading-relaxed text-custom-green">
              {post.description}
            </p>

            {!post.images.some((img) => img && img.trim() !== '') && (
              <p className="mt-6 text-custom-blue text-3xl">
                🧸 hAnKiE neMá žáDnou FoTo 😢
              </p>
            )}
          </div>
        </section>
        {post.video && (
          <div className="max-w-3xl mx-auto mb-8 mt-4 md:mt-0">
            <div className="relative overflow-hidden pt-[56.25%]">
              <iframe
                className="rounded-xl border-4 border-custom-red absolute inset-0 size-full"
                src={`https://www.youtube.com/embed/${post.video}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </main>
      {filteredOtherPosts.length > 0 && (
        <section className="border-t-2 border-t-custom-purple">
          <h2 className="col-span-full text-center text-xl md:text-4xl font-bold text-custom-purple mb-8 mt-4">
            🧵 Další hAnKiEho zÁpiSky...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOtherPosts.slice(0, 4).map((post) => (
              <Post
                key={post.postId}
                postId={post.postId}
                title={post.title}
                description={post.description}
                tag={post.tag}
                createdBy={post.createdBy}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        </section>
      )}
    </Container>
  )
}

export default PostPage
