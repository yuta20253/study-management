import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { deviationValuesLists } from './deviationValuesLists'
import { useChangeCheckboxesHandler } from './useChangeCheckboxesHandler'
import { useClearSelectCheckBoxesHandlers } from './useClearSelectCheckBoxesHandlers'

export const DataState = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [deviationValues, setDeviationValues] = useState<number[]>([35.0, 75.0])

  useEffect(() => {
    console.log(`checkedItems:::::${checkedItems}`)
  }, [checkedItems])
  const router = useRouter()

  const { handleChange } = useChangeCheckboxesHandler(setCheckedItems)

  const {
    handleClearInstallationCategory,
    handleClearCommonEntranceExaminationSunjects,
    handleClearSecondEntranceExaminationSunjects,
    handleClearFacultySystem,
    handleClearDeviationValues,
  } = useClearSelectCheckBoxesHandlers(setCheckedItems, setDeviationValues)

  return {
    checkedItems,
    setCheckedItems,
    deviationValues,
    setDeviationValues,
    router,
    handleChange,
    handleClearInstallationCategory,
    deviationValuesLists,
    handleClearDeviationValues,
    handleClearFacultySystem,
    handleClearCommonEntranceExaminationSunjects,
    handleClearSecondEntranceExaminationSunjects,
  }
}
