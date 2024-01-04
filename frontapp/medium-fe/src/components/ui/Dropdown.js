'use client'
// DropdownMenu.js
import Link from 'next/link'
import {
  VscSignIn,
  VscAccount,
  VscListUnordered,
  VscSignOut,
} from 'react-icons/vsc'
import axios from '@/config/axios-config'
import { useUser } from '@/hooks/useUser'
import { QueryClient } from '@tanstack/react-query'

export default function DropdownMenu() {
  const queryClient = new QueryClient()

  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/auth/logout')
      queryClient.invalidateQueries('user') // 유저 데이터 쿼리를 무효화하여 다시 가져옵니다.
      window.location.href = '/' // 메인 페이지로 이동합니다.
    } catch (error) {
      console.error(error)
    }
  }

  const { user, isLoading, isError } = useUser()

  return (
    <div className='absolute top-14 right-5 p-4 bg-white shadow-lg flex flex-col space-y-4'>
      {!user ? (
        <>
          <Link href='/auth/signin'>
            <button className='btn btn-outline btn-wide hover:bg-gray-200'>
              <VscSignIn className='mr-2' />
              로그인
            </button>
          </Link>
          <Link href='/auth/signup'>
            <button className='btn btn-outline btn-wide hover:bg-gray-200'>
              <VscAccount className='mr-2' />
              회원가입
            </button>
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className='btn btn-outline btn-wide hover:bg-gray-200'>
          <VscSignOut className='mr-2' />
          로그아웃
        </button>
      )}

      <Link href='/board'>
        <button className='btn btn-outline btn-wide hover:bg-gray-200'>
          <VscListUnordered className='mr-2' />
          게시판
        </button>
      </Link>
    </div>
  )
}
