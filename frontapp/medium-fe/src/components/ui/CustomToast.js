'use client'

import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

export default function CustomToast({ closeToast }) {
  const router = useRouter()

  return (
    <div className='p-4 font-jalnan bg-white rounded-md'>
      <h2 className='text-lg text-sky-300 font-semibold mb-2'>
        회원가입에 성공했습니다.
      </h2>
      <p className='mb-4 text-blue-200 font-semibold'>
        로그인 페이지로 이동하시겠습니까?
      </p>
      <div className='flex flex-row justify-around'>
        <button
          className='p-2 w-1/3 bg-green-500 text-white rounded'
          onClick={() => {
            router.push('/auth/signin')
            closeToast()
          }}>
          예
        </button>
        <button
          className='p-2 w-1/3 bg-red-400 text-white rounded'
          onClick={() => {
            window.location.href = '/'
            closeToast()
          }}>
          아니요
        </button>
      </div>
    </div>
  )
}
