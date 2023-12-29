'use client'

import React, { useState, useEffect } from 'react'
import { HiDocumentText } from 'react-icons/hi'
import { useUser } from '@/hooks/useUser'
import { VscTrash, VscEdit } from 'react-icons/vsc'
import { useRouter } from 'next/navigation'
import axios from '../../config/axios-config'
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import Comment from '../comment/Comment'
import { getAllComments } from '@/utils/comment'
import { IoLockClosed } from 'react-icons/io5'
import Link from 'next/link'

export default function PostDetail({ postDetail }) {
  const { user, isLoading } = useUser() // 사용자 정보와 로딩 상태를 가져옵니다.
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([]) // 댓글 목록을 저장할 상태 변수를 정의합니다.
  const router = useRouter()

  const fetchComments = async () => {
    const fetchedComments = await getAllComments(postDetail.id)
    setComments(fetchedComments)
  }

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getAllComments(postDetail.id)
      setComments(fetchedComments)
    }
    fetchComments()
  }, [postDetail.id])

  const handleCommentUpdate = async (commentId, updatedContent) => {
    try {
      const response = await axios.put(`/api/v1/comment/update/${commentId}`, {
        content: updatedContent,
      })

      // 서버에서 응답받은 업데이트된 댓글 데이터를 사용하여 목록 업데이트
      if (response.status === 200) {
        fetchComments() // 댓글 목록 다시 불러오기
      }
    } catch (error) {
      console.error('댓글 수정 실패:', error)
    }
  }

  const handleCommentDelete = async (commentId) => {
    // 사용자에게 삭제 확인 요청
    const isConfirmed = window.confirm('정말로 삭제하시겠습니까?')

    if (isConfirmed) {
      try {
        await axios.delete(`/api/v1/comment/delete/${commentId}`)
        // 댓글 목록 업데이트
        fetchComments()
      } catch (error) {
        console.error('댓글 삭제 실패:', error)
      }
    }
  }
  const handleUpdatePost = async (e, postId) => {
    e.preventDefault()

    router.push(`/board/write/${postId}`)
  }

  const handleDeletePost = async (e, postId) => {
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

  const handleSubmitComment = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/v1/comment/save', {
        postId: postDetail.id,
        content: comment,
      })

      console.log(response.data.objectData)

      const newComment = response.data.objectData
      // 댓글 전송 후 필요한 처리를 여기에 작성하세요 (예: 폼 초기화, 알림 표시)
      setComments((prevComments) => [...prevComments, newComment])
      setComment('')
    } catch (error) {
      console.error('Error:', error)
      // 에러 처리 로직을 여기에 작성하세요
    }
  }

  // if ((!user || user.role == 'USER') && postDetail.isPaid == true) {
  //   return <div>이 글은 유료멤버십전용 입니다.</div>
  // }

  return (
    <div>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-lg mx-auto my-20'>
        <div className='flex items-center justify-between py-2 px-4 border-b dark:border-gray-700'>
          <h1 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
            <HiDocumentText className='inline-block h-6 w-6 mr-2 text-blue-500' />
            {postDetail.title}
          </h1>
        </div>
        {(!user || user.role === 'USER') && postDetail.isPaid === true ? (
          <div className='flex flex-col items-center justify-center h-[40vh]'>
            <div className='bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto'>
              <div className='flex flex-col items-center text-center'>
                <IoLockClosed className='text-6xl text-red-500 mb-4' />
                <h2 className='text-2xl font-bold mb-4'>
                  유료 멤버십 전용 컨텐츠
                </h2>
                <p className='text-gray-600 mb-4'>
                  이 글은 유료 멤버십 회원만 열람 가능합니다.
                </p>
                <Link href='/membership'>
                  <button className='btn btn-primary'>멤버십 가입하기</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
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
                    onClick={(e) => handleUpdatePost(e, postDetail.id)}>
                    <VscEdit className='mr-1' /> 수정
                  </button>
                  <button
                    className='btn btn-error btn-outline'
                    onClick={(e) => handleDeletePost(e, postDetail.id)}>
                    <VscTrash className='mr-1' /> 삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className='mb-5 mt-4 p-4 bg-blue-200 rounded-md shadow-md'>
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
      {/* 댓글 목록 */}
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            onCommentUpdate={handleCommentUpdate}
            onCommentDelete={handleCommentDelete}
          />
        ))}
      </div>
      {/* 로그인한 사용자에게만 댓글 폼을 표시 */}
      {user && !isLoading && (
        <div className='mt-4'>
          <form onSubmit={handleSubmitComment}>
            <textarea
              className='w-full h-24 px-3 py-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
              placeholder='댓글을 입력하세요...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type='submit'
              className='mt-2 px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
              댓글 달기
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
