import SocialLoginBtn from './SocialLoginBtn';

export default function SocialLoginBtnArea() {
  return (
    <>
      <div className='flex justify-between items-center mt-10'>
        <div
          style={{ height: '1px' }}
          className='bg-gray-300 block w-4/12'
        ></div>
        <p className='md:mx-2 text-sm font-light text-gray-400'>소셜 로그인</p>
        <div
          style={{ height: '1px' }}
          className='bg-gray-300 block w-4/12'
        ></div>
      </div>
      <div className='grid md:grid-cols-2 gap-2 mt-7'>
        <SocialLoginBtn socialType='google' />
        <SocialLoginBtn socialType='github' />
      </div>
    </>
  );
}
