import { createContext, Dispatch, SetStateAction } from 'react'
import { DesiredSchoolProps } from '@/types/DesiredSchool'

export const DesiredSchoolDeleteContext = createContext(
  {} as {
    universities: DesiredSchoolProps[] | undefined
    setUniversities: Dispatch<SetStateAction<DesiredSchoolProps[] | undefined>>
    deleteId: number | undefined
    setDeleteId: Dispatch<SetStateAction<number | undefined>>
    isDelete: boolean
    setIsDelete: Dispatch<SetStateAction<boolean>>
  },
)
