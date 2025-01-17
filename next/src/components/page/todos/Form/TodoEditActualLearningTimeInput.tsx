import { Dispatch, SetStateAction } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
type ActualLearningTimeProps = {
  theme: string
  actualLearningTime: string
  registerActualLearningTime: string
  setScheduledStudyTime: Dispatch<SetStateAction<string>>
  setActualLearningTime: Dispatch<React.SetStateAction<string>>
  setTotalHour: Dispatch<SetStateAction<number>>
  handleChangeHours: (event: string) => void
  rules?: {
    required: string
    min: { value: number; message: string } // Add min validation
    max: { value: number; message: string } // Add max validation
  }
  error?: FieldError
}

export const TodoEditActualLearningTime = ({
  theme,
  actualLearningTime,
  registerActualLearningTime,
  setActualLearningTime,
  setTotalHour,
  handleChangeHours,
  rules,
  error,
}: ActualLearningTimeProps) => {
  const { register, formState } = useFormContext()

  // 入力欄が消された場合、実際の学習時間を引く処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newActualLearningTime = e.target.value
    console.log('コンソールが呼ばれた')

    // 値が空ならば totalHour を減らす
    if (newActualLearningTime === '') {
      setTotalHour((prev) => prev - Number(actualLearningTime))
    }

    setActualLearningTime(newActualLearningTime)
    handleChangeHours(newActualLearningTime)
    console.log('関数が呼ばれた')
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newActualLearningTime = e.target.value
    console.log('newActualLearningTime:::', newActualLearningTime)

    // バリデーションエラーがない場合のみ onBlur を実行
    if (Object.keys(formState.errors).length === 0) {
      // 空欄のときに current actualLearningTime の値を引く
      if (newActualLearningTime === '') {
        setTotalHour((prev) => prev - Number(actualLearningTime))
      } else {
        // 空欄でない場合は新しい値を加算
        setTotalHour((prev) => prev + Number(newActualLearningTime))
      }
    } else {
      // バリデーションエラーがある場合は current actualLearningTime を引く
      setTotalHour((prev) => prev - Number(actualLearningTime))
    }
  }
  return (
    <tr className="w-full">
      <th className="mt-2 h-12 w-1/2">{theme}</th>
      <td className="h-8 w-full p-2 sm:w-1/2 sm:p-4 md:w-1/3">
        <div className="flex items-center justify-start gap-2 sm:justify-start sm:gap-4">
          <input
            type="number"
            value={actualLearningTime}
            {...register(`${registerActualLearningTime}`, rules)}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-1/2 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-3/4"
          />
          <span className="text-base sm:text-xl">時間</span>
        </div>
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </td>
    </tr>
  )
}
