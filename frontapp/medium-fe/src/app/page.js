'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from '../config/axios-config'
import { VscListUnordered } from 'react-icons/vsc'

export default function HomePage() {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/api/v1/post/list?page=${page}`)
      setPosts(response.data.objectData.content) // Assuming the posts are in response.data.objectData.content
      setTotalPages(response.data.objectData.totalPages)
      console.log('====================================')
      console.log(response.data.objectData.content)
      console.log('====================================')
    }
    fetchPosts()
  }, [page])

  return (
    <section className='flex flex-col justify-center items-center max-w-[850px] mx-auto mt-10'>
      <h1 className='flex items-center basis-1/12'>글 목록</h1>
      <Link href='/board/write'>
        <button className='btn btn-outline btn-md hover:bg-gray-200 mt-10'>
          <VscListUnordered className='mr-2' />새 글 작성
        </button>
      </Link>
      <div className='grid grid-cols-3 gap-4 mt-8'>
        {posts.map((post, index) => (
          <div key={index} className='border p-4 rounded shadow'>
            <h2 className='text-lg font-bold mb-2'>{post.title}</h2>
            <div className='space-y-2'>
              <p className='text-gray-600'>{post.content}</p>
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
