'use client'

import React, { useEffect } from 'react'
import axios from '../../config/axios-config'

export default function KakaoSignInCallback() {
  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code) {
      // 인증 코드를 백엔드 서버로 전송
      axios
        .get(`/oauth2/kakao?code=${code}`)
        .then((response) => {
          // 성공적으로 응답 받음
          console.log('백엔드 서버 응답:', response.data)

          // 추가 작업: 예를 들어 사용자를 대시보드로 리디렉션
          window.location.href = '/'
        })
        .catch((error) => {
          // 오류 처리
          console.error('인증 코드 전송 실패:', error)
        })
    }
  }, [])

  return (
    <div>
      <p>카카오 로그인 처리 중...</p>
    </div>
  )
}
