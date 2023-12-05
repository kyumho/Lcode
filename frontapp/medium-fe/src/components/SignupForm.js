import React from 'react'
import Link from 'next/link'
import {
  FaUserCircle,
  FaLock,
  FaEnvelope,
  FaAddressCard,
  FaCheckCircle,
} from 'react-icons/fa'
import ProfilePicture from './ProfilePicture'

export default function SignupForm() {
  return (
    <div className='flex mt-20 items-start justify-center h-screen'>
      <div className='bg-white border border-gray-200 p-16 rounded-xl shadow-lg w-2/5 h-auto'>
        <h2 className='text-2xl font-bold mb-6 text-center'>회원가입</h2>
        <div className='space-y-3'>
          <div className='relative flex items-center space-x-3'>
            <FaUserCircle size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pr-10 pl-8'
              type='text'
              placeholder='아이디'
            />
            <button className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2'>
              <FaCheckCircle />
            </button>
          </div>
          <div className='flex items-center space-x-3'>
            <FaLock size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='password'
              placeholder='비밀번호'
            />
          </div>
          <div className='flex items-center space-x-3'>
            <FaLock size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='password'
              placeholder='비밀번호 확인'
            />
          </div>
          <div className='relative flex items-center space-x-3'>
            <FaEnvelope size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pr-10 pl-8'
              type='email'
              placeholder='이메일'
            />
            <button className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2'>
              <FaCheckCircle />
            </button>
          </div>
          <div className='flex items-center space-x-3'>
            <FaAddressCard size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='text'
              placeholder='주소'
            />
          </div>
          <div className='flex items-center space-x-3'>
            <FaAddressCard size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='text'
              placeholder='상세주소'
            />
          </div>
          <ProfilePicture />
          <button className='bg-blue-500 text-white rounded w-full py-2'>
            가입하기
          </button>
        </div>
        <Link href='/auth/signin'>
          <p className='text-sm text-right mt-4 mr-2 hover:text-gray-400'>
            계정이 있으신가요?
          </p>
        </Link>
      </div>
    </div>
  )
}
