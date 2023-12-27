'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import { FaUserEdit, FaCheckCircle, FaTimes } from 'react-icons/fa'
import axios from '../../config/axios-config'
import { USERNAME_REGEX, PASSWORD_REGEX } from '@/utils/regex'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

export default function EditUser() {
  const { user, isLoading, isError } = useUser()
  const router = useRouter()

  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
    address: '',
    addressDetail: '',
  })

  const [errors, setErrors] = useState({
    password: null,
    confirmPassword: null,
    address: null,
    addressDetail: null,
  })

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

  const handleSubmit = async (e) => {
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

    const response = await axios
      .put('/api/v1/member/update', form)
      .then((res) => {
        toast.success('회원 정보가 수정되었습니다.')
        router.push('/mypage/userinfo')
      })
      .catch((err) => {
        toast.error('회원 정보 수정에 실패했습니다.')
      })
  }

  if (isLoading) return <div></div>

  return (
    <div className='p-8 bg-white w-[80vh] h-[80vh] shadow-md rounded flex flex-col items-center space-y-6'>
      <ToastContainer />
      <h1 className='text-3xl font-bold'>회원 정보 수정</h1>
      <form onSubmit={handleSubmit} className='w-full space-y-6'>
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
