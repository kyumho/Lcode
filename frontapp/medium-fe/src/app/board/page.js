import React from 'react'
import AllPost from '@/components/post/AllPost'

export const metadata = {
  title: 'Posts',
}

export default function page() {
  return (
    <div>
      <AllPost />
    </div>
  )
}
