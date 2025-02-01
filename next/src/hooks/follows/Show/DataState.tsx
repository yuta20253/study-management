import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { showUser, error } = useFetch()
  return {
    showUser,
    error,
  }
}
