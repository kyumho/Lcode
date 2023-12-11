'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from '../../config/axios-config'
import { VscListUnordered } from 'react-icons/vsc'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

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
          <Link href={`/board/${post.id}`} key={index}>
            <div
              key={index}
              className='border p-4 rounded shadow flex flex-col h-[300px]'>
              <h2 className='text-lg font-bold mb-2'>
                {post.title.length > 10
                  ? post.title.substring(0, 10) + '...'
                  : post.title}
              </h2>
              <div className='space-y-2'>
                <p className='text-gray-600 flex-grow'>
                  {post.content.length > 50
                    ? post.content.substring(0, 50) + '...'
                    : post.content}
                </p>
                <p className='text-sm text-gray-500 mt-4'>
                  작성자: {post.author}
                </p>
                <p className='text-sm text-gray-500'>
                  생성일자: {post.createdDate}
                </p>
                <p className='text-sm text-gray-500'>
                  수정일자: {post.modifiedDate}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='flex flex-row items-center space-x-3 mt-6'>
        <button onClick={() => setPage((p) => p - 1)} disabled={page <= 0}>
          이전 페이지
        </button>
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`mx-1 ${
                page === i ? 'text-red-500' : 'text-blue-500'
              }`}
              onClick={() => setPage(i)}>
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages - 1}>
          다음 페이지
        </button>
      </div>
    </section>
  )
}
