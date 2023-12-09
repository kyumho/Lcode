'use client'
import React from 'react'
import { HiDocumentText } from 'react-icons/hi'
import { useUser } from '@/hooks/useUser'
import { VscTrash, VscEdit } from 'react-icons/vsc'
import { useRouter } from 'next/navigation'

export default function PostDetail({ postDetail }) {
  const { user, isLoading } = useUser() // 사용자 정보와 로딩 상태를 가져옵니다.
  const router = useRouter()

  const handleUpdate = async (e, postId) => {
    e.preventDefault()

    router.push(`/board/write/${postId}`)
  }

  const handleDelete = async (e, postId) => {
    e.preventDefault()
    console.log(`Delete post: ${postId}`)
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-lg mx-auto my-20'>
      <div className='flex items-center justify-between py-2 px-4 border-b dark:border-gray-700'>
        <h1 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
          <HiDocumentText className='inline-block h-6 w-6 mr-2 text-blue-500' />
          {postDetail.title}
        </h1>
      </div>
      <div className='p-4'>
        <p className='text-gray-600 dark:text-gray-400'>{postDetail.content}</p>
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
  )
}
