'use client'

import React, { useState, useRef } from 'react'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'

export default function WritePost() {
  const [title, setTitle] = useState('')
  const editorRef = useRef()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handlePostSubmit = () => {
    const editorInstance = editorRef.current.getInstance()
    const content = editorInstance.getMarkdown()

    // 이제 'title'과 'content'를 사용하여 서버에 데이터를 저장할 수 있습니다.
    console.log(title, content)
  }

  return (
    <div className='flex h-full'>
      <div className='bg-white border border-gray-200 p-16 rounded-xl shadow-lg w-full h-full'>
        <h2 className='text-2xl font-bold mb-6 text-center'>새 글 작성</h2>
        <div className='space-y-3'>
          <input
            className='w-full border border-gray-300 rounded py-2 px-4'
            type='text'
            placeholder='제목'
            onChange={handleTitleChange}
          />
          <Editor
            initialValue='글을 작성해주세요'
            previewStyle='vertical'
            height='700px'
            initialEditType='markdown'
            useCommandShortcut={true}
            ref={editorRef}
          />
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
