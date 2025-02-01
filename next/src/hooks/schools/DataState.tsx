import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { university, school_id, error } = useFetch()
  return {
    university,
    school_id,
    error,
  }
}
