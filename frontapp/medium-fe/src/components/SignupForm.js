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
import { USERNAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/regex'

export default function SignupForm() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    address: '',
    addressDetail: '',
  })

  const [errors, setErrors] = useState({
    username: null,
    password: null,
    confirmPassword: null,
    email: null,
    address: null,
    addressDetail: null,
  })

  const [userExistIconColor, setUserExistIconColor] = useState('')
  const [emailExistIconColor, setEmailExistIconColor] = useState('')

  const checkUserExists = async () => {
    try {
      const response = await axios.get(`/api/v1/member/exist/${form.username}`)
      console.log(response.data)
      if (response.data) {
        setErrors({
          ...errors,
          username: '이미 사용중인 아이디입니다.',
        })
      } else {
        toast.info('사용 가능한 아이디입니다.')
        setUserExistIconColor('text-green-500')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const checkEmailExists = async () => {
    try {
      const response = await axios.get(`/api/v1/email/exist/${form.email}`)

      if (response.data) {
        setErrors({
          ...errors,
          email: '이미 등록된 이메일입니다.',
        })
      } else {
        toast.info('사용 가능한 이메일입니다.')
        setEmailExistIconColor('text-green-500')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSearchAddress = (e) => {
    e.preventDefault()

    const script = document.createElement('script')
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    document.body.appendChild(script)

    if (window.daum && window.daum.Postcode) {
      new daum.Postcode({
        oncomplete: function (data) {
          // 검색 결과에서 첫 번째 결과를 사용
          setForm({
            ...form,
            address: data.address,
          })
        },
      }).open()
    } else {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  const handleChange = (e) => {
    e.preventDefault()

    const { name, value } = e.target

    if (name == 'username') {
      setUserExistIconColor('')
    }

    if (name == 'email') {
      setEmailExistIconColor('')
    }

    // 비밀번호 확인 필드의 경우
    if (name === 'confirmPassword') {
      if (value !== form.password) {
        setErrors({
          ...errors,
          [name]: '비밀번호가 일치하지 않습니다.',
        })
      } else {
        setErrors({
          ...errors,
          [name]: null,
        })
      }
    } else if (name === 'username' && !value.match(USERNAME_REGEX)) {
      setErrors({
        ...errors,
        [name]: '아이디는 영문자와 숫자만 가능합니다.',
      })
    } else if (name === 'email' && !value.match(EMAIL_REGEX)) {
      setErrors({
        ...errors,
        [name]: '유효한 이메일 주소를 입력해주세요.',
      })
    } else if (name === 'password' && !value.match(PASSWORD_REGEX)) {
      setErrors({
        ...errors,
        [name]:
          '비밀번호는 10자 이상, 대문자, 소문자, 숫자, 특수기호를 포함해야 합니다.',
      })
    } else {
      setErrors({
        ...errors,
        [name]: null,
      })
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 필드가 비어있는지 검사
    const emptyFields = Object.keys(form).filter((key) => !form[key])
    if (emptyFields.length > 0) {
      toast.error('프로필 사진을 제외한 모든 정보를 입력해주세요.')
      return
    }

    const errorFields = Object.keys(errors).filter((key) => errors[key])
    if (errorFields.length > 0) {
      toast.error('입력한 정보를 다시 한번 확인해주세요.')
      return
    }

    if (userExistIconColor !== 'text-green-500') {
      toast.error('아이디를 인증해주세요.')
      return
    }

    if (emailExistIconColor !== 'text-green-500') {
      toast.error('이메일을 인증해주세요.')
      return
    }

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
    <div className='flex mt-20 w-full items-start justify-center h-screen'>
      <ToastContainer />
      <div className='bg-white border  border-gray-200 p-16 rounded-xl shadow-lg w-full md:w-2/5 h-auto'>
        <h2 className='text-2xl font-bold mb-6 text-center'>회원가입</h2>
        <div className='space-y-5 flex-grow'>
          <div className='flex flex-grow items-center'>
            <FaUserCircle className='min-w-fit' size={20} />
            <div className='flex flex-grow flex-row'>
              <div className='flex flex-col flex-grow'>
                <input
                  className='border ml-3 flex flex-grow border-gray-300 rounded py-2 pr-12 pl-8'
                  type='text'
                  name='username'
                  placeholder='아이디'
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className='mt-1 ml-2 text-xs h-3 text-red-500'>
                    {errors.username}
                  </p>
                )}
              </div>
              <button
                className={`p-2 ml-2 mb-3 ${userExistIconColor}`}
                onClick={checkUserExists}>
                <FaCheckCircle className='min-w-fit' size={20} />
              </button>
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <FaLock className='min-w-fit' size={20} />
            <div className='flex flex-col flex-grow'>
              <input
                className='border border-gray-300 rounded py-2 pl-8'
                type='password'
                name='password'
                placeholder='비밀번호'
                onChange={handleChange}
              />
              <p className='mt-1 text-xs h-3 text-red-500'>
                {errors.password || ''}
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <FaLock className='md:block' size={20} />
            <div className='flex flex-col flex-grow'>
              <input
                className='flex-grow border border-gray-300 rounded py-2 pl-8'
                type='password'
                name='confirmPassword'
                placeholder='비밀번호 확인'
                onChange={handleChange}
              />
              <p className='mt-1 text-xs h-3 text-red-500'>
                {errors.confirmPassword || ''}
              </p>
            </div>
          </div>

          <div className='flex flex-grow items-center space-x-3'>
            <FaEnvelope className='min-w-fit' size={20} />
            <div className='flex flex-grow flex-col'>
              <input
                className='border flex flex-grow border-gray-300 rounded py-2 pr-12 pl-8'
                type='email'
                name='email'
                placeholder='이메일'
                onChange={handleChange}
              />
              <p className='mt-1 text-xs h-3 text-red-500'>
                {errors.email || ''}
              </p>
            </div>
            <button
              onClick={checkEmailExists}
              className={`p-2 mb-3 ${emailExistIconColor}`}>
              <FaCheckCircle className='min-w-fit' size={20} />
            </button>
          </div>

          <div className='flex items-center space-x-3'>
            <FaAddressCard className='min-w-fit' size={20} />
            <input
              className='flex-grow border border-gray-300 rounded py-2 pl-8'
              type='text'
              name='address'
              placeholder='주소'
              value={form.address}
              onChange={handleChange}
            />
            <button
              onClick={handleSearchAddress}
              className='px-5 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none'>
              검색
            </button>
          </div>

          <div className='flex items-center space-x-3'>
            <FaAddressCard className='min-w-fit' size={20} />
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
