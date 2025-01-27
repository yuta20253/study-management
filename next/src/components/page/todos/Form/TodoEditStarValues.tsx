import { StarRating } from '@/components/page/todos/Rating/StarRating'
import { StarValuesProps } from '@/types/Todo/Form/form'

export const TodoEditStarValues = ({
  theme,
  props,
  setSelectedStars,
}: StarValuesProps) => {
  return (
    <tr className="w-full">
      <th className="mt-2 h-12 w-1/2">{theme}</th>
      <td className="flex h-8 w-1/2">
        <StarRating
          totalStars={5}
          selectedStars={props}
          setSelectedStars={setSelectedStars}
        />
      </td>
    </tr>
  )
}
