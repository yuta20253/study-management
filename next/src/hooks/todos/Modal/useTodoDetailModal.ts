import { useCallback, useState } from 'react'

export const useTodoDetailModal = () => {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)

  const onDetailOpen = useCallback(() => {
    setIsDetailOpen(true)
  }, [setIsDetailOpen])

  const onDetailClose = useCallback(() => {
    setIsDetailOpen(false)
  }, [setIsDetailOpen])
  return { isDetailOpen, onDetailOpen, onDetailClose }
}
