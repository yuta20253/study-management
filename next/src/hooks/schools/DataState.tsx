import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { university, school_id } = useFetch()
  return {
    university,
    school_id,
  }
}
