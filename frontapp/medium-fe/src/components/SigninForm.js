'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaUserCircle, FaLock, FaGoogle, FaCoffee } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from '../config/axios-config'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/v1/auth/login', credentials)

      if (response.status === 200) {
        // 로그인 성공, 메인 페이지로 이동
        window.location.href = '/'
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          // 아이디나 비밀번호 오류
          toast.error('아이디와 비밀번호를 확인해주세요')
        } else if (error.response.status === 403) {
          // 이메일 인증 필요
          toast.error('이메일 인증을 해주세요')
        }
      } else {
        console.error(error)
      }
    }
  }

  return (
    <div className='flex mt-20 items-start justify-center h-screen'>
      <ToastContainer />
      <div className='bg-white border border-gray-200 p-16 rounded-xl shadow-lg w-2/5 h-auto'>
        <h2 className='text-2xl font-bold mb-6 text-center'>로그인</h2>
        <div className='space-y-3'>
          <div className='flex items-center space-x-3'>
            <FaUserCircle size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='text'
              name='username'
              placeholder='아이디'
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center space-x-3'>
            <FaLock size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='password'
              name='password'
              placeholder='비밀번호'
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleSubmit}
            className='bg-blue-500 text-white rounded w-full py-2'>
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
