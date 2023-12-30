'use client'

import React, { useState, useEffect } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import axios from '../../config/axios-config'

const LikeButton = ({ user, postDetail }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(
          `/api/v1/likes/status?userId=${user.id}&postId=${postDetail.id}`
        )
        console.log(response.data)
        setLiked(response.data.liked)
        setLikes(response.data.likesCount)
      } catch (error) {
        console.error('좋아요 상태 조회 실패', error)
      }
    }

    fetchLikeStatus()
  }, [user.id, postDetail.id]) // 의존성 목록에 user.id와 postDetail.id 추가

  const handleLike = async () => {
    try {
      const response = await axios.post('/api/v1/likes/toggle', {
        userId: user.id,
        postId: postDetail.id,
      })
      console.log(response.data)
      setLiked(response.data.liked)
      setLikes(response.data.likesCount)
    } catch (error) {
      console.error('좋아요 상태 업데이트 실패', error)
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`btn ${liked ? 'btn-error' : 'btn-outline'} btn-sm`}>
      <AiFillHeart
        className={`mr-1 ${liked ? 'text-white' : 'text-red-500'}`}
      />
      {liked ? '좋아요 취소' : '좋아요'} {/* 좋아요 상태에 따라 텍스트 변경 */}
      <span className={`badge ${liked ? 'badge-warning' : 'badge-outline'}`}>
        {likes}
      </span>
    </button>
  )
}

export default LikeButton
