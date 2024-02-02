import React from 'react'
import ChatbotPage from '@/components/ui/Chatbot'

export const metadata = {
  title: 'Chatbot',
}

export default async function page() {
  return (
    <div>
      <ChatbotPage />
    </div>
  )
}
