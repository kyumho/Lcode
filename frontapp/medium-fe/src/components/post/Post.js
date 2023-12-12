'use client'

import Link from 'next/link'

const Post = ({ post }) => (
  <Link href={`/board/${post.id}`}>
    <div className='border p-4 rounded shadow flex flex-col h-[300px]'>
      <h2 className='text-lg font-bold mb-2'>
        {post.title.length > 10
          ? post.title.substring(0, 10) + '...'
          : post.title}
      </h2>
      <div className='space-y-2'>
        <p className='text-gray-600 flex-grow'>
          {post.content.length > 50
            ? post.content.substring(0, 50) + '...'
            : post.content}
        </p>
        <p className='text-sm text-gray-500 mt-4'>작성자: {post.author}</p>
        <p className='text-sm text-gray-500'>생성일자: {post.createdDate}</p>
        <p className='text-sm text-gray-500'>수정일자: {post.modifiedDate}</p>
      </div>
    </div>
  </Link>
)

export default Post
