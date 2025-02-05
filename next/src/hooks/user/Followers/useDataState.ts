import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const { users, error } = useFetch()
  return { users, error }
}
