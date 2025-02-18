import { Star } from './star'
import { StarRatingProps } from '@/types/Todo/Rating/Star'

export const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  selectedStars,
  setSelectedStars,
}: StarRatingProps) => {
  return (
    <>
      {[...Array(totalStars)].map((_, i: number) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
    </>
  )
}
