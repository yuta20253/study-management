import { useRouter } from 'next/router'
import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { user, setUser, selected, setSelected, error } = useFetch()
  const router = useRouter()

  const birth = new Date(user.birthday)
  const today = new Date()
  const age = today.getFullYear() - birth.getFullYear()

  console.log(selected)

  return {
    user,
    setUser,
    router,
    selected,
    setSelected,
    birth,
    age,
    error,
  }
}
