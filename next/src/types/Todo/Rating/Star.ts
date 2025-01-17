import { Dispatch, SetStateAction } from 'react'

export type StarProps = {
  selected: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (f: any) => any
}

export type StarRatingProps = {
  totalStars: number
  selectedStars: number
  setSelectedStars: Dispatch<SetStateAction<number>>
}
