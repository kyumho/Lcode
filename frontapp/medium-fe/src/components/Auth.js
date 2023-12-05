'use client';

import Link from 'next/link';
import AuthForm from './ui/auth-area/AuthForm';
import SocialLoginBtnArea from './ui/auth-area/SocialLoginBtnArea';

export default function Auth({ authType }) {
  return (
    <>
      <AuthForm authType={authType} />
      {authType === 'signin' && (
        <>
          <SocialLoginBtnArea />
          <p className='mt-11 text-sm sm:text-xs text-center font-light text-gray-400'>
            계정이 없으신가요? &nbsp;
            <Link
              href='/auth/signup'
              className='text-gray-700 hover:text-gray-900 font-medium'
            >
              <em>회원가입 하기</em>
            </Link>
          </p>
        </>
      )}
    </>
  );
}
