import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { facultyData, school_id, id, error } = useFetch()
  return {
    facultyData,
    school_id,
    id,
    error,
  }
}
