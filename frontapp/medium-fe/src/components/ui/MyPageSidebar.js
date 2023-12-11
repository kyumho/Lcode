import React from 'react'
import {
  FaUser,
  FaPen,
  FaThumbsUp,
  FaComment,
  FaUserTimes,
} from 'react-icons/fa'
import Link from 'next/link'

export default function MyPageSidebar() {
  return (
    <div className='flex h-[80vh]'>
      <div className='w-64 bg-gray-400 text-white p-6'>
        <Link href='/mypage'>
          <h2 className='text-xl font-bold mb-4'>마이페이지</h2>
        </Link>
        <hr className='p-5' />
        <ul>
          <li className='flex items-center space-x-2 mb-2'>
            <FaUser />
            <Link href='/mypage/userinfo'>회원 정보</Link>
          </li>
          <hr className='p-3' />
          <li className='flex items-center space-x-2 mb-2'>
            <FaPen />
            <Link href='/mypage/mypost'>내가 작성한 글</Link>
          </li>
          <hr className='p-3' />
          <li className='flex items-center space-x-2 mb-2'>
            <FaThumbsUp />
            <Link href='/mypage/myrecommend'>내가 추천한 글</Link>
          </li>
          <hr className='p-3' />
          <li className='flex items-center space-x-2 mb-2'>
            <FaComment />
            <Link href='/mypage/mycomment'>작성한 댓글</Link>
          </li>
          <hr className='p-3' />
          <li className='flex items-center space-x-2 mb-2'>
            <FaUserTimes />
            <Link href='/mypage/userinfo/delete'>회원 탈퇴</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
