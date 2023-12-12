'use client'

import React, { useState, useEffect } from 'react'
import axios from '../../config/axios-config'
import Post from './Post'
import Pagination from '../ui/Pagination'
import { Tab } from '@headlessui/react'
import { IoLockClosed, IoLockOpen } from 'react-icons/io5'

export default function MyPost() {
  const [publicPosts, setPublicPosts] = useState([])
  const [privatePosts, setPrivatePosts] = useState([])
  const [publicPage, setPublicPage] = useState(0)
  const [privatePage, setPrivatePage] = useState(0)
  const [publicTotalPages, setPublicTotalPages] = useState(0)
  const [privateTotalPages, setPrivateTotalPages] = useState(0)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const privateRes = await axios
          .get(`/api/v1/post/mypost/not-published?page=${privatePage}`)
          .then((res) => {
            const privatePost = res.data
            setPrivatePosts(privatePost.content)
            setPrivateTotalPages(privatePost.totalPages)
          })

        const publicRes = await axios
          .get(`/api/v1/post/mypost/published?page=${publicPage}`)
          .then((res) => {
            const publicPost = res.data
            console.log(res.data)
            setPublicPosts(publicPost.content)
            setPublicTotalPages(publicPost.totalPages)
          })
      } catch (err) {
        console.error(err)
      }
    }

    getPosts()
  }, [publicPage, privatePage])

  return (
    <div className='container min-w-[80vh] mx-auto py-6'>
      <Tab.Group>
        <Tab.List className='flex flex-grow space-x-1 rounded-xl bg-blue-900/20 p-1'>
          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-500 hover:bg-white/[0.12] hover:text-white'
                }`}>
                <IoLockOpen className='inline-block h-5 w-5' /> 공개글
              </button>
            )}
          </Tab>
          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-500 hover:bg-white/[0.12] hover:text-white'
                }`}>
                <IoLockClosed className='inline-block h-5 w-5' /> 비공개글
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className='mt-2 w-full'>
          <Tab.Panel className='w-full'>
            <div className='flex flex-col items-center'>
              <div className='grid grid-cols-3 gap-4 w-full mb-4'>
                {publicPosts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
              <div className='w-full flex justify-center'>
                <Pagination
                  page={publicPage}
                  setPage={setPublicPage}
                  totalPages={publicTotalPages}
                />
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className='mt-2 min-h-full min-w-full'>
            <div className='flex flex-col items-center'>
              <div className='grid grid-cols-3 gap-4 w-full mb-4'>
                {privatePosts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
              <div className='w-full flex justify-center'>
                <Pagination
                  page={privatePage}
                  setPage={setPrivatePage}
                  totalPages={privateTotalPages}
                />
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
