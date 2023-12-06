import { useQuery } from '@tanstack/react-query'
import axios from '../config/axios-config'

const fetchUser = async () => {
  const { data } = await axios.get('api/v1/member/info')
  return data
}

export function useUser() {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ['user'], queryFn: fetchUser, retry: 0 })
  return { user, isLoading, isError, error }
}
