import React, { useState } from 'react'
import Link from 'next/link'
import {
  FaUserCircle,
  FaLock,
  FaEnvelope,
  FaAddressCard,
  FaCheckCircle,
} from 'react-icons/fa'
import ProfilePicture from './ProfilePicture'
import axios from '../config/axios-config'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomToast from './CustomToast'

export default function SignupForm() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    address: '',
    addressDetail: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/v1/member/join', form)

      if (response.status === 201) {
        toast(<CustomToast />, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
          closeOnClick: false,
          draggable: false,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex mt-20 items-start justify-center h-screen'>
      <ToastContainer />
      <div className='bg-white border border-gray-200 p-16 rounded-xl shadow-lg w-full md:w-2/5 h-auto'>
        <h2 className='text-2xl font-bold mb-6 text-center'>회원가입</h2>
        <div className='space-y-3'>
          <div className='relative flex items-center space-x-3'>
            <FaUserCircle size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pr-10 pl-8'
              type='text'
              name='username'
              placeholder='아이디'
              onChange={handleChange}
            />
            <button className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2'>
              <FaCheckCircle size={20} />
            </button>
          </div>
          <div className='flex items-center space-x-3'>
            <FaLock className='hidden md:block' size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='password'
              name='password'
              placeholder='비밀번호'
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center space-x-3'>
            <FaLock className='hidden md:block' size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='password'
              placeholder='비밀번호 확인'
            />
          </div>

          <div className='relative flex items-center space-x-3'>
            <FaEnvelope className='hidden md:block' size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pr-10 pl-8'
              type='email'
              name='email'
              placeholder='이메일'
              onChange={handleChange}
            />
            <button className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2'>
              <FaCheckCircle size={20} />
            </button>
          </div>
          <div className='flex items-center space-x-3'>
            <FaAddressCard className='hidden md:block' size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='text'
              name='address'
              placeholder='주소'
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center space-x-3'>
            <FaAddressCard className='hidden md:block' size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='text'
              name='addressDetail'
              placeholder='상세주소'
              onChange={handleChange}
            />
          </div>
          <ProfilePicture />
          <button
            onClick={handleSubmit}
            className='bg-blue-500 text-white rounded w-full py-2'>
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
