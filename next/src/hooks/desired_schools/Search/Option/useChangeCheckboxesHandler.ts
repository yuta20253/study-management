import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const useChangeCheckboxesHandler = (
  setCheckedItems: Dispatch<SetStateAction<string[]>>,
) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value

    setCheckedItems((prev) => {
      if (prev.includes(name)) {
        // チェックが入っている場合は削除
        const newArr = prev.filter((item) => item !== name)
        console.log('newArr:', newArr)
        return newArr
      } else {
        // チェックが入っていない場合は追加
        return [...prev, name]
      }
    })
  }
  return {
    handleChange,
  }
}
