'use client'

import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function WritePost() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  return (
    <div className='flex mt-20 items-start justify-center h-screen'>
      <div className='bg-white border border-gray-200 p-16 rounded-xl shadow-lg w-2/5 h-auto'>
        <h2 className='text-2xl font-bold mb-6 text-center'>새 글 작성</h2>
        <div className='space-y-3'>
          <input
            className='w-full border border-gray-300 rounded py-2 px-4'
            type='text'
            placeholder='제목'
          />
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
          />
          <button className='bg-blue-500 text-white rounded w-full py-2'>
            게시하기
          </button>
        </div>
      </div>
    </div>
  )
}
