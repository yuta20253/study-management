import { useState } from 'react'

export const useChangeModalStatus = () => {
  const [isModalOoen, setIsModalOpen] = useState<boolean>(false)
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return {
    isModalOoen,
    handleOpenModal,
    handleCloseModal,
  }
}
