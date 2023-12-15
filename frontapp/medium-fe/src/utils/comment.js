import axios from '../config/axios-config'

export const getAllComments = async (postId) => {
  try {
    const response = await axios.get(`/api/v1/comment/list/${postId}`)
    console.log(response.data.listData)
    return response.data.listData
  } catch (error) {
    console.error('댓글 로딩 실패:', error)
    return [] // 오류 발생 시 빈 배열 반환
  }
}
