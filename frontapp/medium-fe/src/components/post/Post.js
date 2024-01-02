'use client'

import Link from 'next/link'
import MDEditor from '@uiw/react-md-editor'
import { AiFillHeart } from 'react-icons/ai'

const Post = ({ post }) => (
  <Link href={`/board/${post.id}`}>
    <div className='border p-4 rounded shadow flex flex-col h-[300px]'>
      {post.isPaid ? (
        <span className='px-2 py-1 text-md text-emerald-400 rounded-full self-start mb-2'>
          💸유료글
        </span>
      ) : (
        <span className='px-2 py-1 text-md text-gray-400 rounded-full self-start mb-2'>
          👍무료글
        </span>
      )}
      <h2 className='text-lg font-bold mb-2'>
        {post.title.length > 10
          ? post.title.substring(0, 10) + '...'
          : post.title}
      </h2>
      <div className='space-y-2'>
        <div className='text-gray-600 flex-grow markdown-preview'>
          <MDEditor.Markdown source={post.content} />
        </div>
        <p className='text-sm text-gray-500 mt-4'>작성자: {post.author}</p>
        <p className='text-sm text-gray-500'>생성일자: {post.createdDate}</p>
        <p className='text-sm text-gray-500'>수정일자: {post.modifiedDate}</p>
        <p className='text-sm text-green-500'>조회수: {post.views}</p>
        <div className='flex items-center text-sm text-gray-500'>
          <AiFillHeart className='text-red-500 mr-1' />
          <span className='mr-2 text-red-300'>좋아요:</span>
          <span className='badge badge-secondary badge-outline'>
            {post.likesCount}
          </span>
        </div>
      </div>
    </div>
  </Link>
)

export default Post
