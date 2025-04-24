import React from 'react'
import Container from './Container'
import { getPosts } from '@/actions/post.action'
import Post from './Post'

const Posts = async () => {
  const posts = await getPosts()

  return (
    <Container className="bg-custom-purple py-10 px-4">
      <h2 className="text-3xl md:text-5xl text-center mb-6 tracking-widest">
        <span className="!font-slackey font-bold bg-gradient-to-br from-custom-green to-custom-green/55 bg-clip-text text-transparent">
          pRIspEvky od H-News
        </span>
        ✨📰🧠
      </h2>

      <div className="grid justify-center grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
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
        {posts.length === 0 && (
          <div className="col-span-3 text-center py-4">
            <h3 className="text-4xl font-slackey text-custom-green animate-bounce">
              nIC tU nEnÍ 😿💔
            </h3>
            <p className="tracking-widest text-2xl font-bold mt-4 text-custom-red italic">
              H-News mOžNá zaPOMněLi přIDAt nĚJAKý pŘÍspĚVky...
            </p>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Posts
