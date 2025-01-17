import { useContext } from 'react'
import { useClickDeleteFetch } from '../../../../hooks/desired_schools/handleDeleteFetch'
import { DeleteDesiredSchoolProps } from '@/types/DesiredSchool/Button/DesiredSchoolButtonType'
import { DesiredSchoolDeleteContext } from '@/types/DesiredSchool/Context/desired_school'

export const DeleteButton: React.FC<DeleteDesiredSchoolProps> = ({
  id,
  isDelete,
  setIsDelete,
}: DeleteDesiredSchoolProps) => {
  const { universities, setUniversities } = useContext(
    DesiredSchoolDeleteContext,
  )

  const { handleClick } = useClickDeleteFetch(
    id,
    isDelete,
    setIsDelete,
    universities,
    setUniversities,
  )

  return (
    <button
      className="rounded bg-sky-500 px-3 text-white"
      onClick={handleClick}
    >
      登録解除
    </button>
  )
}
