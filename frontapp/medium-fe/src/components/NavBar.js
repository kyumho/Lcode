'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Dropdown from './ui/navbar-menu/Dropdown';
import NavbarSvgBtn from './ui/navbar-menu/NavbarSvgBtn';
import CategoryMenu from './ui/navbar-menu/CategoryMenu';
import NavbarIconBtn from './ui/navbar-menu/NavbarIconBtn';

export default function Navbar() {
  const [login, setLogin] = useState(false);

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost text-xl'>
          daisyUI
        </Link>
        <div className='hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <CategoryMenu />
          </ul>
        </div>
      </div>
      <div className='flex-none'>
        <div className='lg:hidden'>
          <NavbarIconBtn menu='search' />
        </div>
        <div className='hidden lg:flex flex-none gap-2'>
          <div className='form-control'>
            <input
              type='text'
              placeholder='Search'
              className='input input-bordered lg:w-96'
            />
          </div>

          {login ? (
            <>
              <NavbarIconBtn menu='cart' />
              <Dropdown menu='avatar' setLogin={setLogin} />
            </>
          ) : (
            <button className='btn ml-2' onClick={() => setLogin(true)}>
              로그인
            </button>
          )}
        </div>
        {/* {!login && (
          <>
            <Link href='/auth/signin' className='ml-2'>
            <button className='btn'>로그인</button>
          </Link>
            <button className='btn ml-2' onClick={() => setLogin(true)}>
              로그인
            </button>
          </>
        )} */}
        <Dropdown menu='dropdown' login={login} setLogin={setLogin} />
      </div>
    </div>
  );
}
