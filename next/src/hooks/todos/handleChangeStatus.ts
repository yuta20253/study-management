import React, { Dispatch, useCallback } from 'react'

export const useStatusHandlers = (
  setStatus: Dispatch<React.SetStateAction<string>>,
) => {
  //絞り込みボタン
  const handleChangeStatusAll = useCallback(() => {
    console.log('全てです')
    setStatus('')
  }, [setStatus])

  const handleChangeStatusIncomplete = useCallback(() => {
    console.log('未完了です')
    setStatus('未完了')
  }, [setStatus])
  const handleChangeStatusComplete = useCallback(() => {
    console.log('完了です')
    setStatus('完了')
  }, [setStatus])
  const handleChangeStatusOnTheWay = useCallback(() => {
    console.log('途中です')
    setStatus('途中')
  }, [setStatus])

  return {
    handleChangeStatusAll,
    handleChangeStatusIncomplete,
    handleChangeStatusComplete,
    handleChangeStatusOnTheWay,
  }
}
