import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { user, todo, router, id } = useFetch()
  return {
    user,
    todo,
    router,
    id,
  }
}
