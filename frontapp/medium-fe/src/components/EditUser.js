'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import { FaUserEdit, FaCheckCircle, FaTimes } from 'react-icons/fa'
import axios from '../config/axios-config'
import { USERNAME_REGEX, PASSWORD_REGEX } from '@/utils/regex'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function EditUser() {
  const { user, isLoading, isError } = useUser()

  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    addressDetail: '',
  })

  const [errors, setErrors] = useState({
    username: null,
    password: null,
    confirmPassword: null,
    address: null,
    addressDetail: null,
  })

  const [userExistIconColor, setUserExistIconColor] = useState('')

  const checkUserExists = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`/api/v1/member/exist/${form.username}`)
      console.log(response.data)
      if (response.data && form.username != user.username) {
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

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        password: '',
        confirmPassword: '',
        address: user.address,
        addressDetail: user.addressDetail,
      })
    }
  }, [user])

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    if (name == 'username') {
      setUserExistIconColor('')
    }

    if (name === 'confirmPassword') {
      if (value !== form.password) {
        setErrors({ ...errors, [name]: '비밀번호가 일치하지 않습니다.' })
      } else {
        setErrors({ ...errors, [name]: null })
      }
    } else if (name === 'username' && !value.match(USERNAME_REGEX)) {
      setErrors({ ...errors, [name]: '아이디는 영문자와 숫자만 가능합니다.' })
    } else if (name === 'password' && !value.match(PASSWORD_REGEX)) {
      setErrors({
        ...errors,
        [name]:
          '비밀번호는 10자 이상, 대문자, 소문자, 숫자, 특수기호를 포함해야 합니다.',
      })
    } else {
      setErrors({ ...errors, [name]: null })
    }

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const emptyFields = Object.keys(form).filter((key) => !form[key])
    if (emptyFields.length > 0) {
      toast.error('모든 정보를 입력해주세요.')
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

    console.log(formData)
    // 서버에 수정 요청을 보내는 코드를 여기에 작성합니다.
  }

  if (isLoading) return <div>로딩 중...</div>

  return (
    <div className='p-8 bg-white w-[80vh] h-[80vh] shadow-md rounded flex flex-col items-center space-y-6'>
      <ToastContainer />
      <h1 className='text-3xl font-bold'>회원 정보 수정</h1>
      <form onSubmit={handleSubmit} className='w-full space-y-6'>
        <label className='flex flex-col'>
          <span className='mb-2 font-semibold'>아이디:</span>
          <div className='flex items-center'>
            <input
              name='username'
              value={form.username}
              onChange={handleChange}
              className='input input-bordered mr-2'
            />
            <button
              className={`p-2 ml-2 mb-3 ${userExistIconColor}`}
              onClick={checkUserExists}>
              <FaCheckCircle
                className={`min-w-fit ${userExistIconColor}`}
                size={20}
              />
            </button>
          </div>
          {errors.username && (
            <span className='text-red-500 text-sm mt-2'>{errors.username}</span>
          )}
        </label>
        <label className='flex flex-col'>
          <span className='mb-2 font-semibold'>비밀번호:</span>
          <input
            name='password'
            type='password'
            value={form.password}
            onChange={handleChange}
            className='input input-bordered'
          />
          {errors.password && (
            <span className='text-red-500 text-sm mt-2'>{errors.password}</span>
          )}
        </label>
        <label className='flex flex-col'>
          <span className='mb-2 font-semibold'>비밀번호 확인:</span>
          <input
            name='confirmPassword'
            type='password'
            value={form.confirmPassword}
            onChange={handleChange}
            className='input input-bordered'
          />
          {errors.confirmPassword && (
            <span className='text-red-500 text-sm mt-2'>
              {errors.confirmPassword}
            </span>
          )}
        </label>
        <label className='flex flex-col'>
          <span className='mb-2 font-semibold'>주소:</span>
          <div className='flex flex-grow'>
            <input
              name='address'
              value={form.address}
              onChange={handleChange}
              className='input input-bordered flex flex-grow'
            />
            <button
              onClick={handleSearchAddress}
              className='ml-2 px-5 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none'>
              검색
            </button>
          </div>

          {errors.address && (
            <span className='text-red-500 text-sm mt-2'>{errors.address}</span>
          )}
        </label>
        <label className='flex flex-col'>
          <span className='mb-2 font-semibold'>상세 주소:</span>
          <input
            name='addressDetail'
            value={form.addressDetail}
            onChange={handleChange}
            className='input input-bordered'
          />
          {errors.addressDetail && (
            <span className='text-red-500 text-sm mt-2'>
              {errors.addressDetail}
            </span>
          )}
        </label>
        <button
          type='submit'
          className='btn btn-primary flex items-center space-x-2'>
          <FaUserEdit />
          <span>수정하기</span>
        </button>
      </form>
    </div>
  )
}
