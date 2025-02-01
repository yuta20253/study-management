import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { users, error } = useFetch()
  return { users, error }
}
