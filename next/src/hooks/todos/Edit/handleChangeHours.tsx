import { Dispatch, SetStateAction, useCallback } from 'react'

export const useChangeHoursHandlers = (
  scheduledStudyTime: string,
  totalHour: number,
  setProgress: Dispatch<SetStateAction<string>>,
  setActualLearningTime: Dispatch<SetStateAction<string>>,
) => {
  const handleChangeHours = useCallback(
    (event: string) => {
      console.log('handleChangeHoursが呼ばれました')
      console.log(`actualLearningTime:::${event}`)
      console.log(`scheduledStudyTime:::${scheduledStudyTime}`)
      const toCompareTotalHours = totalHour + Number(event)
      if (event === '') {
        console.log('空欄です')
        setProgress('途中')
        return
      }
      if (toCompareTotalHours >= Number(scheduledStudyTime)) {
        console.log('完了になります')
        setActualLearningTime(event)
        setProgress('完了')
      } else {
        console.log('途中になります')
        setProgress('途中')
      }
    },
    [scheduledStudyTime, setActualLearningTime, setProgress, totalHour],
  )
  return {
    handleChangeHours,
  }
}
