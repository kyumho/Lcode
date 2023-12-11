'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '../../hooks/useUser'
import {
  VscAccount,
  VscAzure,
  VscListUnordered,
  VscQuestion,
  VscSignIn,
  VscThreeBars,
} from 'react-icons/vsc'
import DropdownMenu from './Dropdown'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from '../../config/axios-config'

export default function Navbar() {
  const { user, isLoading, isError } = useUser()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const defaultProfileImage =
    'https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800' // 기본 프로필 이미지 경로

  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/auth/logout')
      queryClient.invalidateQueries('user') // 유저 데이터 쿼리를 무효화하여 다시 가져옵니다.
      window.location.href = '/' // 메인 페이지로 이동합니다.
    } catch (error) {
      console.error(error)
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='bg-gray-50 py-5 px-4 flex flex-row lg:flex-row justify-between items-center w-full'>
      <div className='flex flex-row space-x-4'>
        <Link href='/'>
          <p className='my-2 text-xl text-gray-600 font-bold cursor-pointer mb-4 lg:mb-0'>
            MyApp
          </p>
        </Link>
        <Link href='/board'>
          <button className='btn btn-outline btn-md hover:bg-gray-200'>
            <VscListUnordered size={20} className='mr-2' />
            게시판
          </button>
        </Link>
        <Link href='/ai'>
          <button className='btn btn-outline btn-md hover:bg-gray-200'>
            <VscQuestion size={20} className='mr-2' />
            GPT에게 질문하기
          </button>
        </Link>
      </div>

      <div className='flex flex-row justify-between lg:hidden'>
        <VscThreeBars
          onClick={toggleMenu}
          className={`text-2xl cursor-pointer`}
        />
        {isOpen && <DropdownMenu />}
      </div>

      {isLoading ? null : user ? (
        <div className='hidden lg:flex lg:space-x-4 lg:justify-around'>
          <p className='my-3'>{user.username}님 환영합니다.</p>
          <Link href='/mypage'>
            <button className='btn btn-outline btn-md hover:bg-gray-200'>
              <VscAzure className='mr-2' />
              마이페이지
            </button>
          </Link>
          <Link href='/auth/signin'>
            <button
              onClick={handleLogout}
              className='btn btn-outline btn-md hover:bg-gray-200'>
              <VscSignIn className='mr-2' />
              로그아웃
            </button>
          </Link>

          <Image
            src={
              user.profileImageUrl ? user.profileImageUrl : defaultProfileImage
            }
            alt='프로필 이미지'
            width={50}
            height={50}
            className='rounded-full'
          />
        </div>
      ) : (
        <div className='hidden lg:flex lg:space-x-4 lg:justify-around'>
          <Link href='/auth/signin'>
            <button className='btn btn-outline btn-md hover:bg-gray-200'>
              <VscSignIn className='mr-2' />
              로그인
            </button>
          </Link>
          <Link href='/auth/signup'>
            <button className='btn btn-outline btn-md hover:bg-gray-200'>
              <VscAccount className='mr-2' />
              회원가입
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
