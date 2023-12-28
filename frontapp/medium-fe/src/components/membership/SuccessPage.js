'use client' // 클라이언트-전용 컴포넌트를 나타내는 선언

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { FaCreditCard, FaShoppingCart, FaClock, FaTag } from 'react-icons/fa'

export default function SuccessPage() {
  const [paymentKey, setPaymentKey] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const [amount, setAmount] = useState(null)

  useEffect(() => {
    // URL 파라미터는 클라이언트 사이드에서만 읽어옵니다.
    const urlParams = new URLSearchParams(window.location.search)
    setPaymentKey(urlParams.get('paymentKey'))
    setOrderId(urlParams.get('orderId'))
    setAmount(parseFloat(urlParams.get('amount')))
  }, [])

  const fetchPayment = async () => {
    if (!paymentKey || !orderId || !amount) return null // 필요한 값들이 설정되었는지 확인

    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments/confirm',
      { paymentKey, orderId, amount },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_TOSS_PAYMENTS_SECRET_KEY}:`,
            'utf-8'
          ).toString('base64')}`,
        },
      }
    )

    return response.data
  }

  const {
    data: payment,
    error,
    isError,
  } = useQuery({
    queryKey: ['payment', paymentKey, orderId, amount],
    queryFn: fetchPayment,
    enabled: !!paymentKey && !!orderId && !!amount, // paymentKey, orderId, amount 값이 있는 경우에만 쿼리를 활성화합니다.
    retry: 1,
  })

  if (isError) {
    return <div>마이페이지에서 결제 내역을 확인해주세요.</div>
  }

  if (!payment) {
    return <div>결제 정보를 불러오는 중...</div>
  }

  return (
    <div className='flex justify-center items-center h-[60vh] bg-gray-100'>
      <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4 flex items-center'>
          <FaShoppingCart className='w-6 h-6 mr-2' /> 결제 성공
        </h1>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center'>
              <FaTag className='w-5 h-5 mr-2 text-blue-500' /> 구매 ID:
            </span>
            <span className='font-medium'>{payment.orderId}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='flex items-center'>
              <FaShoppingCart className='w-5 h-5 mr-2 text-blue-500' /> 구매
              내역:
            </span>
            <span className='font-medium'>{payment.orderName}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='flex items-center'>
              <FaCreditCard className='w-5 h-5 mr-2 text-blue-500' /> 결제 수단:
            </span>
            <span className='font-medium'>{payment.method}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='flex items-center'>
              <FaTag className='w-5 h-5 mr-2 text-blue-500' /> 결제 금액:
            </span>
            <span className='font-medium'>{payment.totalAmount}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='flex items-center'>
              <FaClock className='w-5 h-5 mr-2 text-blue-500' /> 결제 시간:
            </span>
            <span className='font-medium'>{payment.approvedAt}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
