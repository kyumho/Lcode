import React, { useState } from 'react'
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineSave,
  AiOutlineClose,
} from 'react-icons/ai'
import { useUser } from '@/hooks/useUser'

export default function Comment({
  commentData,
  onCommentUpdate,
  onCommentDelete,
}) {
  const { user, isLoading } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(commentData.content)

  const isAuthor = user && user.username === commentData.author

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setEditedContent(commentData.content) // Reset the content to original
  }

  const handleSaveClick = () => {
    onCommentUpdate(commentData.id, editedContent)
    setIsEditing(false)
  }

  return (
    <div className='p-4 bg-gray-100 rounded-lg shadow-md mb-3'>
      <div className='flex justify-between items-start'>
        <div className='flex-1'>
          <div className='mb-2'>
            <p className='font-semibold text-gray-800'>
              Written by : {commentData.author}
            </p>
            <p className='mt-1 text-gray-700'>{commentData.content}</p>
            {isEditing && (
              <div className='mt-2'>
                <textarea
                  className='w-full h-24 px-3 py-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className='flex justify-end space-x-2 mt-2'>
                  <button
                    onClick={handleSaveClick}
                    className='btn btn-primary btn-sm flex items-center'>
                    <AiOutlineSave className='mr-2' /> 저장
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className='btn btn-error btn-sm flex items-center'>
                    <AiOutlineClose className='mr-2' /> 취소
                  </button>
                </div>
              </div>
            )}
          </div>
          <hr className='my-2' />
          <div>
            <p className='text-sm text-gray-600'>
              작성일시 : {commentData.createdAt}
            </p>
            {commentData.updatedAt && (
              <p className='text-sm text-gray-600'>
                수정됨 : {commentData.updatedAt}
              </p>
            )}
          </div>
        </div>
        {isAuthor && (
          <div className='flex flex-col items-center ml-3'>
            <button
              onClick={handleEditClick}
              className='mb-2 p-2 text-blue-600 hover:text-blue-800'>
              <AiFillEdit size='1.25em' />
            </button>
            <button
              onClick={() => onCommentDelete(commentData.id)}
              className='p-2 text-red-600 hover:text-red-800'>
              <AiFillDelete size='1.25em' />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
