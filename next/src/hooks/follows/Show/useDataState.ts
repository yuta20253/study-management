import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const {
    showUser,
    allStudyHours,
    oneDayStudyHours,
    oneWeekStudyHours,
    oneMonthStudyHours,
    totalHoursWithinOneDay,
    totalHoursWithinOneWeek,
    totalHoursWithinOneMonth,
    error,
  } = useFetch()
  return {
    showUser,
    allStudyHours,
    oneDayStudyHours,
    oneWeekStudyHours,
    oneMonthStudyHours,
    totalHoursWithinOneDay,
    totalHoursWithinOneWeek,
    totalHoursWithinOneMonth,
    error,
  }
}
