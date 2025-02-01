import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { user, error } = useFetch()
  const birth = new Date(user.birthday)
  const today = new Date()
  const age = today.getFullYear() - birth.getFullYear()
  const year = birth.getFullYear()
  const month = birth.getMonth() + 1
  const day = birth.getDate()

  return {
    user,
    age,
    year,
    month,
    day,
    error,
  }
}
