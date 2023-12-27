// app/api/confirmPayment/route.js

import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req, res) {
  const { paymentKey, orderId, amount } = req.body

  console.log(req.body['paymentKey'])

  try {
    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_TOSS_PAYMENTS_SECRET_KEY}:`,
            'utf-8'
          ).toString('base64')}`,
        },
      }
    )

    return new NextResponse(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error.response.data), {
      status: error.response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
