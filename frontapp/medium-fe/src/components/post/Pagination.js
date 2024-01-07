'use client'
import React from 'react'

export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div className='flex flex-row items-center space-x-3 mt-6'>
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 0))}
        disabled={page <= 0}>
        이전 페이지
      </button>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`mx-1 ${page === i ? 'text-red-500' : 'text-blue-500'}`}
            onClick={() => setPage(i)}>
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
        disabled={page >= totalPages - 1}>
        다음 페이지
      </button>
    </div>
  )
}
