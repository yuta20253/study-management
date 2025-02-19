import { Slider } from '@mui/material'
import { useContext } from 'react'
import { SliderContext } from '@/types/DesiredSchool/Context/option'

export const DeviationValueRangeSlider = () => {
  const { deviationValues, setDeviationValues } = useContext(SliderContext)

  const handleChangeValue = (event: Event, newValue: number | number[]) => {
    setDeviationValues(newValue as number[])
  }
  return (
    <div className="w-80">
      <Slider
        value={deviationValues}
        onChange={handleChangeValue}
        getAriaLabel={() => 'Temperature range'}
        step={2.5}
        min={35}
        max={75}
      />
    </div>
  )
}
