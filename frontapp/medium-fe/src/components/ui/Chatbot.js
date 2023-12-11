'use client'

import { useState } from 'react'
import callOpenAI from '@/utils/openai'
import { HiOutlineArrowRight } from 'react-icons/hi'
import 'tailwindcss/tailwind.css'
import '@toast-ui/editor/dist/toastui-editor.css'

export default function ChatbotPage() {
  const [history, setHistory] = useState([])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const getAnswer = async () => {
    setLoading(true)
    const currentQuestion = question
    setQuestion('')
    const data = await callOpenAI(currentQuestion)
    const answer = data.choices[0].message.content
    setHistory((prevHistory) => [
      ...prevHistory,
      { question: currentQuestion, answer },
    ])
    setLoading(false)
  }

  const handleQuestionChange = (event) => {
    event.preventDefault()
    setQuestion(event.target.value)
  }

  const handleQuestionSubmit = (event) => {
    event.preventDefault()
    if (question.trim() !== '') {
      getAnswer()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault()
      getAnswer()
    }
  }

  return (
    <div className='p-6 w-full h-[90vh] flex flex-col items-center space-y-4 bg-white'>
      <div className='overflow-auto flex-1 w-full max-w-2xl bg-white rounded-xl shadow-md p-4'>
        {history.map((item, index) => (
          <div key={index} className='mb-4'>
            <div className='text-blue-600 mb-2'>Q: {item.question}</div>
            <div className='text-black'>A: {item.answer}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleQuestionSubmit} className='w-full max-w-2xl'>
        <div className='mt-4 flex items-center'>
          <textarea
            placeholder='무엇이든 물어보세요...'
            value={question}
            onChange={handleQuestionChange}
            onKeyDown={handleKeyDown}
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-grow sm:text-sm border-gray-300 rounded-md'
            rows={3}
            disabled={loading} // 요청 중일 때 textarea를 비활성화합니다.
          />
          <button
            type='submit'
            className='ml-2 bg-indigo-600 text-white rounded-md p-2 flex items-center'>
            <HiOutlineArrowRight />
          </button>
        </div>
      </form>
      {loading && (
        <div className='mt-2 text-indigo-600'>
          답변이 올때까지 잠시 대기해주세요! ㅎㅎ{' '}
        </div>
      )}
    </div>
  )
}
