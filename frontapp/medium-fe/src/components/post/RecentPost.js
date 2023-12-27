'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from '../../config/axios-config'
import { VscListUnordered } from 'react-icons/vsc'
import Post from './Post'
import Pagination from '../ui/Pagination'

export default function AllPost() {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const getPost = async () => {
      const response = await axios
        .get(`/api/v1/post/recent?page=${page}`)
        .then((res) => {
          const post = res.data.objectData
          setPosts(post.content)
          setTotalPages(post.totalPages)
        })
        .catch((err) => console.log(err))
    }
    getPost()
  }, [page])

  return (
    <section className='flex flex-col justify-center items-center max-w-[850px] mx-auto mt-10'>
      <h1 className='flex items-center basis-1/12'>최신 글</h1>

      <div className='grid grid-cols-3 gap-4 mt-8'>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  )
}
