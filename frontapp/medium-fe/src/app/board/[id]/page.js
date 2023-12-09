import React from 'react'
import axios from '../../../config/axios-config'
import PostDetail from '@/components/PostDetail'
import { getPost } from '@/utils/post'

export default async function page({ params: { id } }) {
  const post = await getPost(id)

  const postDetail = post.objectData

  return (
    <div>
      <PostDetail postDetail={postDetail} />
    </div>
  )
}
