'use client'

import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchPosts({
  sortCode,
  setSortCode,
  kwType,
  setKwType,
  keyword,
  setKeyword,
  onSearch,
}) {
  return (
    <div className='search-container p-4 bg-white shadow-md rounded-lg mb-7'>
      <div className='flex gap-2 items-center'>
        <select
          className='select select-bordered select-sm w-full max-w-xs'
          value={sortCode}
          onChange={(e) => setSortCode(e.target.value)}>
          <option value='createdAtDesc'>최신순</option>
          <option value='createdAtAsc'>오래된순</option>
          <option value='hitAsc'>조회수 낮은순</option>
          <option value='hitDesc'>조회수 높은순</option>
          <option value='likeCountAsc'>좋아요 낮은순</option>
          <option value='likeCountDesc'>좋아요 높은순</option>
        </select>
        <select
          className='select select-bordered select-sm w-full max-w-xs'
          value={kwType}
          onChange={(e) => setKwType(e.target.value)}>
          <option value='title'>제목</option>
          <option value='body'>내용</option>
          <option value='title,body'>제목과 내용</option>
          <option value='title,body,author'>제목, 내용, 작성자 아이디</option>
        </select>
        <input
          type='text'
          className='input input-bordered input-sm w-full max-w-xs'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='검색어 입력'
        />
        <button className='btn btn-square btn-sm' onClick={onSearch}>
          <FaSearch />
        </button>
      </div>
    </div>
  )
}
