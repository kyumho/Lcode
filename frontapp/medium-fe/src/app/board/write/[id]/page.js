import React from 'react'
import EditPost from '@/components/post/EditPost'

export default function page({ params: data }) {
  console.log(data.id)
  return <EditPost id={data.id} />
}
