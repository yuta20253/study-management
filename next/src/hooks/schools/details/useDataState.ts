import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const { facultyData, school_id, id, error } = useFetch()
  return {
    facultyData,
    school_id,
    id,
    error,
  }
}
