import axios from '../config/axios-config'

export async function getPost(id) {
  try {
    const response = await axios.get(`/api/v1/post/detail/${id}`)
    return response.data
  } catch (err) {
    console.error(err)
  }
}
