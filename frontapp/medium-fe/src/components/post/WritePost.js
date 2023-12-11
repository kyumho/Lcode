'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import axios from '../../config/axios-config'
import { useRouter } from 'next/navigation'
import { IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import callOpenAI from '@/utils/openai'

export default function WritePost({
  postId,
  postTitle,
  postContent,
  isPublished,
}) {
  const [title, setTitle] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const editorRef = useRef()
  const router = useRouter()

  useEffect(() => {
    console.log(isPublished)
    if (postId) {
      // postId가 있을 때만 API 호출을 시도합니다(수정일때만).

      const editorInstance = editorRef.current.getInstance()
      setTitle(postTitle)
      editorInstance.setMarkdown(postContent)
      setIsChecked(!isPublished)
    }
  }, [postId, postTitle, postContent, isPublished])

  const handleTitleChange = (e) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    const editorInstance = editorRef.current.getInstance()
    const content = editorInstance.getMarkdown()
    const isPublished = !isChecked

    // 제목과 내용이 비어있는 경우를 검증합니다.
    if (!title.trim()) {
      toast.error('제목을 입력해주세요.')
      return
    }

    if (!content.trim()) {
      toast.error('내용을 입력해주세요.')
      return
    }

    // GPT에게 질문을 던져 답변을 얻습니다.

    if (postId) {
      toast.info(
        '저장 중입니다... 최대 20~30초가 소요됩니다. 잠시만 기다려주세요.',
        {
          autoClose: 30000,
        }
      ) // 저장 중 메시지 띄우기
      const gptRes = await callOpenAI(content)
      const gptAnswer = gptRes.choices[0].message.content

      const response = await axios
        .put(`/api/v1/post/update/${postId}`, {
          title,
          content,
          isPublished,
          gptAnswer, // GPT의 답변을 함께 저장합니다.
        })
        .then((res) => {
          if (res.status == 200) {
            toast.success('게시글이 수정되었습니다.') // 성공 메시지 띄우기
            window.location.href = `/board/${postId}`
            // router.push(`/board/${postId}`) // 상세페이지로 이동
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error('게시글 수정 실패') // 실패 메시지 띄우기
        })
    } else {
      toast.info('저장 중입니다...', {
        autoClose: 20000,
      }) // 저장 중 메시지 띄우기
      const gptRes = await callOpenAI(content)
      const gptAnswer = gptRes.choices[0].message.content

      const response = await axios
        .post('/api/v1/post/write', {
          title,
          content,
          isPublished,
          gptAnswer, // GPT의 답변을 함께 저장합니다.
        })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data.objectData)
            toast.success('게시글이 작성되었습니다.') // 성공 메시지 띄우기
            router.push(`/board`) // board 페이지로 이동
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error('게시글 작성 실패') // 실패 메시지 띄우기
        })
    }

    // 이제 'title'과 'content'를 사용하여 서버에 데이터를 저장할 수 있습니다.
    console.log(title, content, isPublished)
  }

  return (
    <div className='flex h-full'>
      <ToastContainer />
      <div className='bg-white border border-gray-200 p-16 rounded-xl shadow-lg w-full h-full'>
        <h2 className='text-2xl font-bold mb-6 text-center'>새 글 작성</h2>
        <div className='space-y-3'>
          <input
            className='w-full border border-gray-300 rounded py-2 px-4'
            type='text'
            placeholder='제목'
            onChange={handleTitleChange}
            value={title}
          />
          <Editor
            initialValue='글을 작성해주세요'
            previewStyle='vertical'
            height='700px'
            initialEditType='markdown'
            useCommandShortcut={true}
            ref={editorRef}
          />
          <input
            type='checkbox'
            className='form-checkbox text-blue-500 h-5 w-5'
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label className='flex space-x-3'>
            {isChecked ? <IoLockClosedOutline /> : <IoLockOpenOutline />}
            <span>{isChecked ? '비공개' : '공개'}</span>
          </label>
          <div className='flex flex-col space-y-10'>
            <button
              onClick={handlePostSubmit}
              className='bg-blue-500 text-white rounded w-full py-2'>
              게시하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
