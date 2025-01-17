import { useRouter } from 'next/router'
import { useState, ChangeEvent } from 'react'

export const DataState = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [deviationValues, setDeviationValues] = useState<number[]>([35.0, 75.0])
  console.log(`deviationValuesの値:::::${deviationValues}`)

  console.log(`checkedItems:::::${checkedItems}`)
  const router = useRouter()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //checkedItemsのstateをセット
    setCheckedItems((prev) => {
      const newArr = [...prev]
      newArr.push(event.target.name)
      return newArr
    })
  }

  const deviationValuesLists = (deviationValuesArr: number[]) => {
    const newValues = []
    let value = deviationValuesArr[0]
    while (value <= deviationValuesArr[1]) {
      newValues.push(value)
      console.log(newValues)
      value += 2.5
    }
    return newValues
  }

  return {
    checkedItems,
    setCheckedItems,
    deviationValues,
    setDeviationValues,
    router,
    handleChange,
    deviationValuesLists,
  }
}
