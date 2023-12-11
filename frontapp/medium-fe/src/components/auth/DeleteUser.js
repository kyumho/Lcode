'use client'

import React, { useState, useEffect } from 'react'
import { FaExclamation } from 'react-icons/fa'
import 'tailwindcss/tailwind.css'
import axios from '../../config/axios-config'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function DeleteUser() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const deleteUser = async () => {
    const response = await axios
      .delete('/api/v1/member/delete')
      .then((res) => {
        if (res.status == 200) {
          closeModal()
          alert('회원 탈퇴가 완료되었습니다.')
          queryClient.invalidateQueries('user')
          window.location.href = '/'
        } else {
          alert('회원 탈퇴에 실패하였습니다.')
          router.push('/') // 홈으로 리디렉션합니다.
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [modalIsOpen])

  return (
    <div className='flex flex-col items-center justify-center w-[80vh] h-[40vh]'>
      <div className='p-4 flex flex-col bg-white rounded shadow-md w-64'>
        <h2 className='text-xl font-bold text-center'>회원 탈퇴</h2>
        <hr className='my-4' />
        <div className='flex items-center space-x-2'>
          <FaExclamation className='w-5 h-5 text-red-500' />
          <span className='text-sm text-gray-500'>
            회원 탈퇴를 원하시면 버튼을 눌러주세요.
          </span>
        </div>
        <button
          onClick={openModal}
          className='mt-4 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700'>
          회원 탈퇴
        </button>
      </div>

      {modalIsOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto flex items-center justify-center'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
          <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                회원 탈퇴
              </h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  정말로 회원 탈퇴를 진행하시겠습니까? 이 작업은 취소할 수
                  없습니다.
                </p>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={deleteUser}>
                탈퇴하기
              </button>
              <button
                type='button'
                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
                onClick={closeModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
