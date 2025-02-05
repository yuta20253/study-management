import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const { user, todo, router, id, error } = useFetch()
  return {
    user,
    todo,
    router,
    id,
    error,
  }
}
