// DropdownMenu.js
import Link from 'next/link'
import { VscSignIn, VscAccount, VscListUnordered } from 'react-icons/vsc'

export default function DropdownMenu() {
  return (
    <div className='absolute top-14 right-5 p-4 bg-white shadow-lg flex flex-col space-y-4'>
      <Link href='/auth/login'>
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
      <Link href='/board'>
        <button className='btn btn-outline btn-wide hover:bg-gray-200'>
          <VscListUnordered className='mr-2' />
          게시판
        </button>
      </Link>
    </div>
  )
}
