import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const { university, school_id, error } = useFetch()
  return {
    university,
    school_id,
    error,
  }
}
