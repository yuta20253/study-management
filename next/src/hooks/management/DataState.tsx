import { useState } from 'react'
import { useModal } from '../todos/Modal/useModal'
import { useFunction } from './handleFunction'
import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const {
    user,
    studyHours,
    studyLists,
    allStudyHours,
    selectSubjectProps,
    error,
  } = useFetch()
  const { isOpen, onOpen, onClose } = useModal()
  const [, setDate] = useState<string>('')
  const [displiedPeriod, setDispliedPeriod] = useState<string>('')
  const [selectedPeriod, setSelectedPeriod] = useState<Date>(new Date())
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [subjectName, setSubjectaName] = useState<string>('')
  const [studyType, setStudyType] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [todoId, setTodoId] = useState<number>(0)
  const [sentlabels, setSentLabels] = useState<string[]>([])
  const [graph, setGraph] = useState<string>('')
  const [secondModalOpen, setSecondModalOpen] = useState<boolean>(false)
  const [forModalSubject, setForModalSubject] = useState<string>('')

  const {
    handleSelectSubject,
    handleCreatePeriod,
    handleChangeDisplayPeriod,
    handleChangeStudyType,
    handleClickStudy,
    handleSelectSubjectName,
    handleSelectGraph,
  } = useFunction(
    setSelectedSubject,
    setDate,
    setSelectedPeriod,
    setDispliedPeriod,
    setStudyType,
    setTitle,
    setTodoId,
    setSubjectaName,
    selectSubjectProps,
    setSentLabels,
    setGraph,
  )

  return {
    isOpen,
    onOpen,
    onClose,
    user,
    studyHours,
    studyLists,
    allStudyHours,
    selectedSubject,
    setSelectedSubject,
    displiedPeriod,
    setDispliedPeriod,
    selectedPeriod,
    setSelectedPeriod,
    studyType,
    setStudyType,
    title,
    setTitle,
    todoId,
    setTodoId,
    setDate,
    subjectName,
    setSubjectaName,
    selectSubjectProps,
    sentlabels,
    setSentLabels,
    graph,
    setGraph,
    secondModalOpen,
    setSecondModalOpen,
    forModalSubject,
    setForModalSubject,
    handleSelectSubject,
    handleCreatePeriod,
    handleChangeDisplayPeriod,
    handleChangeStudyType,
    handleClickStudy,
    handleSelectSubjectName,
    handleSelectGraph,
    error,
  }
}
