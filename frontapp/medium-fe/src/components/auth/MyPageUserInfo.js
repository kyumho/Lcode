'use client'

import React from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'

export default function MyPageUserInfo() {
  const { user, isLoading, isError } = useUser()
  const router = useRouter()

  const handleEditButtonClick = () => {
    router.push('/mypage/userinfo/edit') // 회원 수정 폼 페이지로 이동합니다.
  }

  if (isLoading) return <div></div>


  const hiddenPassword = '*'.repeat('abcdefghijkabcdffe'.length) // user.password.length

  return (
    <div className='flex bg-gray-200'>
      <div className=' p-4 bg-gray-100 w-[80vh] h-[80vh] shadow-md rounded flex flex-col items-center'>
        <h1 className='text-2xl font-bold mb-4'>회원 정보</h1>
        <p className='text-lg mb-3'>
          <strong>아이디:</strong> {user.username}
        </p>
        <p className='text-lg mb-3'>
          <strong>비밀번호: </strong> {hiddenPassword} (비공개)
        </p>
        <p className='text-lg mb-3'>
          <strong>이메일:</strong> {user.email}
        </p>
        <p className='text-lg mb-3'>
          <strong>주소:</strong> {user.address}
        </p>
        <p className='text-lg mb-6'>
          <strong>상세 주소:</strong> {user.addressDetail}
        </p>
        <button
          onClick={handleEditButtonClick}
          className='flex items-center space-x-2 bg-blue-500 text-white rounded-md px-4 py-2'>
          <FaUserEdit />
          <span>수정</span>
        </button>
      </div>
    </div>
  )
}
