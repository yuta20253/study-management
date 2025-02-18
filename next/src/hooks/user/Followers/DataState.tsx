import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { users } = useFetch()
  return { users }
}
