import Link from 'next/link';
import AuthInput from './AuthInput';

export default function AuthForm({ authType }) {
  const title =
    (authType === 'signin' && '로그인') ||
    (authType === 'signup' && '회원가입');

  const loginHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className='font-medium text-2xl mt-3 text-center'>{title}</h1>
      <form className='mt-12' onSubmit={loginHandler}>
        <AuthInput inputType='email' />
        <AuthInput inputType='password' />
        {authType === 'signin' ? (
          <div className='flex justify-end mt-2 mb-8 text-sm sm:text-xs text-gray-600'>
            <Link href='#'>비밀번호를 잊으셨나요?</Link>
          </div>
        ) : (
          <AuthInput inputType='phone' />
        )}
        <button
          className={`${
            authType === 'signup' && 'mt-12'
          } pt-4 pr-5 pb-4 pl-5 block text-center text-white bg-gray-700 p-3 duration-300 rounded-lg hover:bg-gray-800 w-full`}
        >
          {authType === 'signin' ? '로그인' : '가입하기'}
        </button>
        {authType === 'signup' && (
          <p className='text-center mt-8 text-sm sm:text-xs text-gray-400'>
            이미 계정이 있으신가요? &nbsp;
            <Link
              href='/auth/signin'
              className='text-gray-700 hover:text-gray-900 font-medium'
            >
              <em>로그인 하러 가기</em>
            </Link>
          </p>
        )}
      </form>
    </>
  );
}
