import React from 'react'
import Link from 'next/link'
import { FaUserCircle, FaLock, FaGoogle, FaCoffee } from 'react-icons/fa'

export default function LoginForm() {
  return (
    <div className='flex mt-20 items-start justify-center h-screen'>
      <div className='bg-white border border-gray-200 p-16 rounded-xl shadow-lg w-2/5 h-auto'>
        <h2 className='text-2xl font-bold mb-6 text-center'>로그인</h2>
        <div className='space-y-3'>
          <div className='flex items-center space-x-3'>
            <FaUserCircle size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='text'
              placeholder='아이디'
            />
          </div>
          <div className='flex items-center space-x-3'>
            <FaLock size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='password'
              placeholder='비밀번호'
            />
          </div>
          <button className='bg-blue-500 text-white rounded w-full py-2'>
            로그인
          </button>
          <div className='mt-4 border-t border-gray-200 pt-4 space-y-2'>
            <button className='flex items-center justify-center w-full py-2 border border-gray-300 rounded'>
              <FaGoogle size={20} className='mr-2' /> Google로 로그인
            </button>
            <button className='flex items-center justify-center w-full py-2 border border-gray-300 rounded'>
              <FaCoffee size={20} className='mr-2' /> Kakao로 로그인
            </button>
          </div>
        </div>
        <Link href='/auth/password-reset'>
          <p className='text-sm text-right mt-4 mr-2 hover:text-gray-400'>
            비밀번호를 잊으셨나요?
          </p>
        </Link>
      </div>
    </div>
  )
}
