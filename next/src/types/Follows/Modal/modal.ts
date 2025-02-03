import { StudyHoursProps } from '@/types/Management'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  studyHours: StudyHoursProps[]
}
