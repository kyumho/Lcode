'use client'
import React from 'react'
import { HiDocumentText } from 'react-icons/hi'
import { useUser } from '@/hooks/useUser'
import { VscTrash, VscEdit } from 'react-icons/vsc'
import { useRouter } from 'next/navigation'
import axios from '../../config/axios-config'
import { HiOutlineChatAlt2 } from 'react-icons/hi'

export default function PostDetail({ postDetail }) {
  const { user, isLoading } = useUser() // 사용자 정보와 로딩 상태를 가져옵니다.
  const router = useRouter()

  const handleUpdate = async (e, postId) => {
    e.preventDefault()

    router.push(`/board/write/${postId}`)
  }

  const handleDelete = async (e, postId) => {
    e.preventDefault()

    if (!confirm('정말로 삭제하시겠습니까?')) {
      return
    }

    axios.delete(`api/v1/post/delete/${postId}`).then((res) => {
      if (res.status == 200) {
        alert('게시글이 삭제되었습니다.')
        router.push('/') // 홈으로 리디렉션합니다.
      } else {
        alert('게시글 삭제에 실패하였습니다.')
        router.push('/') // 홈으로 리디렉션합니다.
      }
    })
  }

  return (
    <div>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-lg mx-auto my-20'>
        <div className='flex items-center justify-between py-2 px-4 border-b dark:border-gray-700'>
          <h1 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
            <HiDocumentText className='inline-block h-6 w-6 mr-2 text-blue-500' />
            {postDetail.title}
          </h1>
        </div>
        <div className='p-4'>
          <p className='text-gray-600 dark:text-gray-400'>
            {postDetail.content}
          </p>
          <div className='mt-4 space-y-3'>
            <div className='flex items-center text-sm text-gray-500 dark:text-gray-300'>
              <span>Written by: {postDetail.author}</span>
            </div>
            <div className='flex items-center mt-2 text-sm text-gray-500 dark:text-gray-300'>
              <span>Created at: {postDetail.createdAt}</span>
            </div>
            <div className='flex items-center mt-2 text-sm text-gray-500 dark:text-gray-300'>
              <span>Updated at: {postDetail.updatedAt}</span>
            </div>
            {user && !isLoading && user.username === postDetail.author && (
              <div className='mt-2 flex space-x-2'>
                <button
                  className='btn btn-primary btn-outline'
                  onClick={(e) => handleUpdate(e, postDetail.id)}>
                  <VscEdit className='mr-1' /> 수정
                </button>
                <button
                  className='btn btn-error btn-outline'
                  onClick={(e) => handleDelete(e, postDetail.id)}>
                  <VscTrash className='mr-1' /> 삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='mt-4 p-4 bg-blue-200 rounded-md shadow-md'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <HiOutlineChatAlt2 className='text-2xl text-blue-500 mr-2' />
            <h3 className='text-lg font-medium text-gray-700'>GPT 답변</h3>
          </div>
          <button
            onClick={() => router.push('/ai')}
            className='px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
            더 물어보기
          </button>
        </div>
        <p className='mt-2 text-sm text-gray-700'>{postDetail.gptAnswer}</p>
      </div>
      <div className='mt-4'>
        <textarea
          className='w-full h-24 px-3 py-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
          placeholder='댓글을 입력하세요...'
        />
        <button className='mt-2 px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
          댓글 달기
        </button>
      </div>
    </div>
  )
}
