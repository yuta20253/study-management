import { FaStar } from 'react-icons/fa'
import { StarProps } from '@/types/Todo/Rating/Star'

export const Star: React.FC<StarProps> = ({
  selected = false,
  onSelect = (f) => f,
}: StarProps) => <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect} />
