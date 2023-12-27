'use client'

import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SuccessPage() {
  const [payment, setPayment] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const paymentKey = urlParams.get('paymentKey')
    const orderId = urlParams.get('orderId')
    const amount = urlParams.get('amount')

    console.log(paymentKey, orderId, amount)

    axios
      .post('/api/confirmPayment', {
        paymentKey: paymentKey,
        orderId: orderId,
        amount: amount,
      })
      .then((response) => setPayment(response.data))
      .catch((error) => {
        setError(error.response.data)
        console.log(error.response.data)
        // Redirect to error page or handle error
      })
  }, [])

  if (error) {
    // Render error message or redirect to an error page
    return <div>Error: {error.message}</div>
  }

  if (!payment) {
    // Render loading state or a placeholder
    return <div>Loading...</div>
  }

  return <main>{/* ... rest of your component */}</main>
}
