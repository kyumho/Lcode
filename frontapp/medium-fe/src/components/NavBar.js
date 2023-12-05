'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  VscAccount,
  VscListUnordered,
  VscSignIn,
  VscThreeBars,
} from 'react-icons/vsc'
import DropdownMenu from './Dropdown'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='bg-gray-50 py-5 px-4 flex flex-row lg:flex-row justify-between items-center w-full'>
      <div className='flex flex-row'>
        <Link href='/'>
          <p className='my-2 text-xl text-gray-600 font-bold cursor-pointer mb-4 lg:mb-0'>
            MyApp
          </p>
        </Link>
        <Link href='/board'>
          <button className='btn btn-outline btn-md hover:bg-gray-200 ml-20 hidden lg:flex lg:space-x-4 lg:justify-around'>
            <VscListUnordered className='mr-2' />
            글쓰기
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
    </div>
  )
}
