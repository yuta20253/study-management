import dayjs from 'dayjs'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { StudyHoursProps } from '@/types/Management'
import { formatDate } from '@/utils/formatDate'

export const useFunction = (
  setSelectedSubject: Dispatch<SetStateAction<string>>,
  setDate: Dispatch<SetStateAction<string>>,
  setSelectedPeriod: Dispatch<SetStateAction<Date>>,
  setDispliedPeriod: Dispatch<SetStateAction<string>>,
  setStudyType: Dispatch<SetStateAction<string>>,
  setTitle: Dispatch<SetStateAction<string>>,
  setTodoId: Dispatch<SetStateAction<number>>,
  setSubjectaName: Dispatch<SetStateAction<string>>,
  selectSubjectProps: StudyHoursProps[],
  setSentLabels: Dispatch<SetStateAction<string[]>>,
  setGraph: Dispatch<SetStateAction<string>>,
) => {
  const handleSelectSubject = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value)
  }

  const handleCreatePeriod = (event: ChangeEvent<HTMLSelectElement>) => {
    // ↓ここに入れていいのか？
    const now = new Date()
    if (event.target.value === '全期間') {
      setDate('全日程')
      //console.log('全期間が選ばれました')
      return
    } else if (event.target.value === '日別') {
      setDate('日別')
      setSelectedPeriod(new Date(dayjs(now).add(-1, 'd').format()))
      //console.log('日別が選ばれました')
    } else if (event.target.value === '週別') {
      setDate('週別')
      setSelectedPeriod(new Date(dayjs(now).add(-1, 'w').format()))
      //console.log('週別が選ばれました')
    } else {
      setDate('月別')
      setSelectedPeriod(new Date(dayjs(now).add(-1, 'M').format()))
      //console.log('月別が選ばれました')
    }
  }

  const handleChangeDisplayPeriod = (event: ChangeEvent<HTMLSelectElement>) => {
    setDispliedPeriod(event.target.value)
  }

  const handleChangeStudyType = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '全て') {
      setStudyType('all')
    } else if (event.target.value === '予習') {
      setStudyType('preparation')
    } else if (event.target.value === '授業') {
      setStudyType('lesson')
    } else {
      setStudyType('review')
    }
  }

  const handleClickStudy = (study: StudyHoursProps) => {
    setTitle(study.title)
    setTodoId(study.todo_id)
    console.log('モーダルが開きました')
  }

  const handleSelectSubjectName = (event: ChangeEvent<HTMLSelectElement>) => {
    setSubjectaName(event.target.value)
    selectSubjectProps.map((data) => {
      setSentLabels((prevArr) => [...prevArr, formatDate(data.created_at)])
    })
  }

  const handleSelectGraph = (event: ChangeEvent<HTMLSelectElement>) => {
    setGraph(event.target.value)
  }

  return {
    handleSelectSubject,
    handleCreatePeriod,
    handleChangeDisplayPeriod,
    handleChangeStudyType,
    handleClickStudy,
    handleSelectSubjectName,
    handleSelectGraph,
  }
}
