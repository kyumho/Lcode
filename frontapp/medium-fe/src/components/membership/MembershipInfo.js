'use client'

import React, { useState } from 'react'
import { IoCash } from 'react-icons/io5'
import { FaMoneyBillWave, FaCashRegister } from 'react-icons/fa'
import { CheckoutPage } from './Checkout'

export default function MembershipInfo() {
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <div className='container mx-auto p-6'>
      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-2xl font-bold mb-4 flex items-center'>
          <FaCashRegister className='text-teal-500 mr-2' size={30} />
          멤버십 안내
        </h2>
        <p className='mb-4'>
          본인의 글을 유료화 할 수 있으며, 미디엄에 가입한 후 유료 멤버십에
          가입하면 유료 글을 볼 수 있습니다.
        </p>
        <p className='mb-4'>
          멤버십 유지비용은 월 2천원이며, 미디엄은 매월 한 번 유료 글 작성자에게
          조회수를 기준으로 멤버십 수익의 일정 부분을 캐시로 정산해줍니다.
        </p>
        <p className='mb-4'>
          <FaMoneyBillWave className='inline mr-2 text-green-500' size={20} />
          해당 캐시는 사이트 내에서 돈처럼 사용 가능하며, 원할 때 환전할 수
          있습니다.
        </p>
        <div className='mt-6'>
          <button
            onClick={() => setShowCheckout(!showCheckout)}
            className='btn btn-primary flex items-center'>
            <IoCash className='mr-2' size={20} />
            가입하기
          </button>
        </div>
        {showCheckout && <CheckoutPage />}
      </div>
    </div>
  )
}
