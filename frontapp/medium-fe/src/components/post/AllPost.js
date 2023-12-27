'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from '../../config/axios-config'
import { VscListUnordered } from 'react-icons/vsc'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Post from './Post'
import Pagination from '../ui/Pagination'

export default function AllPost() {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const { user, isLoading } = useUser()
  const router = useRouter()

  const handleNewPost = () => {
    console.log(user, isLoading)
    if (!user && !isLoading) {
      toast.error('로그인이 필요합니다.')
      router.push('/auth/signin') // 로그인 페이지로 이동
      return
    } else {
      router.push('/board/write') // 새 글 작성 페이지로 이동
    }
  }

  useEffect(() => {
    const getPost = async () => {
      const response = await axios
        .get(`/api/v1/post/list?page=${page}`)
        .then((res) => {
          const post = res.data.objectData
          setPosts(post.content)
          setTotalPages(post.totalPages)
        })
        .catch((err) => console.log(err))
    }
    getPost()
  }, [page])

  return (
    <section className='flex flex-col justify-center items-center max-w-[850px] mx-auto mt-10'>
      <h1 className='flex items-center basis-1/12'>글 목록</h1>
      <button
        onClick={handleNewPost}
        className='btn btn-outline btn-md hover:bg-gray-200 mt-10'>
        <VscListUnordered className='mr-2' />새 글 작성
      </button>
      <div className='grid grid-cols-3 gap-4 mt-8'>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  )
}
