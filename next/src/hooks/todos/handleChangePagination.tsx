import { useRouter } from 'next/router'

export const usePaginationHandler = () => {
  const router = useRouter()
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    router.push('/current/todos/?page=' + value)
  }
  return {
    handleChangePage,
  }
}
