import { Slider } from '@mui/material'
import { useContext } from 'react'
import { SliderContext } from '@/types/DesiredSchool/Context/option'

export const DeviationValueRangeSlider = () => {
  const { deviationValues, setDeviationValues } = useContext(SliderContext)

  const handleChangeValue = (event: Event, newValue: number | number[]) => {
    setDeviationValues(newValue as number[])
  }

  return (
    <div className="w-full px-4 sm:w-80">
      <Slider
        value={deviationValues}
        onChange={handleChangeValue}
        getAriaLabel={() => 'DeviationValueRange'}
        step={2.5}
        min={35}
        max={75}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value.toFixed(1)}`}
        sx={{
          width: '100%', // Ensure the slider takes up 100% of its container width
        }}
      />
    </div>
  )
}
