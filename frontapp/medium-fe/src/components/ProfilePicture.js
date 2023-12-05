import { FaUser } from 'react-icons/fa'

export default function ProfilePicture({ handleFileChange, form }) {
  return (
    <label className='block mt-4'>
      <div className='flex'>
        <FaUser size={20} />
        <span className='text-gray-700 ml-2'>프로필 사진</span>
      </div>

      <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
        <div className='space-y-1 text-center'>
          <svg
            className='mx-auto h-12 w-12 text-gray-400'
            stroke='currentColor'
            fill='none'
            viewBox='0 0 48 48'
            aria-hidden='true'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 10l-5.5 5.5m0 0l5.5 5.5m-5.5-5.5h22m-11 0v22m-9-18v14a2 2 0 002 2h14a2 2 0 002-2V20M4 14a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z'
            />
          </svg>
          <div className='flex text-sm text-gray-600'>
            <label
              htmlFor='file-upload'
              className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'>
              <span>파일 업로드</span>
              <input
                id='file-upload'
                name='file-upload'
                type='file'
                accept='image/*'
                className='sr-only'
                onChange={handleFileChange}
              />
            </label>
            <p className='text-blue-500 ml-2'>(선택)</p>
          </div>
          <p className='text-xs text-gray-500'>{'PNG, JPG, GIF up to 10MB'}</p>
        </div>
      </div>
    </label>
  )
}
