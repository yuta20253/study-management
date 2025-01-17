import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { showUser } = useFetch()
  return {
    showUser,
  }
}
