'use client'

import React, { useState, useEffect } from 'react'
import WritePost from '@/components/WritePost'
import { useUser } from '@/hooks/useUser'
import { getPost } from '@/utils/post'
import { useRouter } from 'next/navigation'

export default function EditPost({ id }) {
  // id가 있을 경우, 그 id의 게시글을 쓴 사람과 세션에 있는 유저가 같은지 확인하고 아니면 못들어가게 막아야 함
  const { user, isLoading } = useUser()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [postUser, setPostUser] = useState('') // 게시글을 쓴 사람
  const router = useRouter()

  useEffect(() => {
    if (isLoading || !id) {
      return
    }

    const fetchPost = async () => {
      const post = await getPost(id)
      const postDetail = post.objectData
      setTitle(postDetail.title)
      setContent(postDetail.content)
      setPostUser(postDetail.author)

      if (user.username != post.objectData.author) {
        alert('수정 권한이 없습니다.')
        router.push('/') // 홈으로 리디렉션합니다.
      }
    }

    fetchPost()
  }, [id, isLoading, user])

  return isLoading || postUser !== user.username ? null : (
    <WritePost postId={id} postTitle={title} postContent={content} />
  )
}
