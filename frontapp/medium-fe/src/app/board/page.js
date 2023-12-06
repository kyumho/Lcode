import React from 'react'
import WritePost from '@/components/WritePost'
import Link from 'next/link'
import { VscListUnordered } from 'react-icons/vsc'

export default function page() {
  return (
    <Link href='/board/write'>
      <button className='btn btn-outline btn-md hover:bg-gray-200 mt-10 ml-20 hidden lg:flex lg:space-x-4 lg:justify-around'>
        <VscListUnordered className='mr-2' />새 글 작성
      </button>
    </Link>
  )
}
