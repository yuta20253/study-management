import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { user, todo, router, id, error } = useFetch()
  return {
    user,
    todo,
    router,
    id,
    error,
  }
}
