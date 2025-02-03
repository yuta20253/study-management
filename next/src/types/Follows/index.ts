import { StudyHoursProps } from '@/types/Management'
export type FollowsUserInfoProps = {
  first?: string | number
  second?: string | number
  third?: string | number
  four?: string | number
  five?: string | number
  six?: string | number
}

export type StudyHoursHistoryInfoProps = {
  studyHours: StudyHoursProps[]
}

export type TotalHoursInfoProps = {
  theme: string
  totalHours: number
  studyHours: StudyHoursProps[]
}
