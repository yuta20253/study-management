import { useEffect } from 'react'
import { useChangeHoursHandlers } from './handleChangeHours'
import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const {
    user,
    todo,
    setTodo,
    router,
    id,
    title,
    setTitle,
    scheduledStudyTime,
    setScheduledStudyTime,
    subject,
    setSubject,
    progress,
    setProgress,
    importance,
    setImportance,
    actualLearningTime,
    setActualLearningTime,
    totalHour,
    setTotalHour,
    studyType,
    setStudyType,
    selectedStars,
    setSelectedStars,
    dueDate,
    setDueDate,
    description,
    setDescription,
    url,
    error,
  } = useFetch()

  const { handleChangeHours } = useChangeHoursHandlers(
    scheduledStudyTime,
    totalHour,
    setProgress,
    setActualLearningTime,
  )

  useEffect(() => {
    handleChangeHours
  }, [handleChangeHours, scheduledStudyTime, actualLearningTime])

  return {
    user,
    todo,
    setTodo,
    router,
    id,
    title,
    setTitle,
    scheduledStudyTime,
    setScheduledStudyTime,
    subject,
    setSubject,
    progress,
    setProgress,
    importance,
    setImportance,
    actualLearningTime,
    setActualLearningTime,
    totalHour,
    setTotalHour,
    studyType,
    setStudyType,
    selectedStars,
    setSelectedStars,
    dueDate,
    setDueDate,
    description,
    setDescription,
    url,
    handleChangeHours,
    error,
  }
}
