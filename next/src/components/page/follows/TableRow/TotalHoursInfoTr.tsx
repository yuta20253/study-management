import Modal from '@/hooks/follows/Modal/useModal'
import { useChangeModalStatus } from '@/hooks/follows/Show/handleChangeModalStatus'
import { TotalHoursInfoProps } from '@/types/Follows'

export const TotalHoursInfoTr = ({
  theme,
  totalHours,
  studyHours,
}: TotalHoursInfoProps) => {
  const { isModalOoen, handleOpenModal, handleCloseModal } =
    useChangeModalStatus()
  return (
    <>
      <tr className="flex items-center justify-center border-b border-gray-200">
        <th
          className="flex-1 px-4 py-2 text-center text-xl font-medium"
          onClick={handleOpenModal}
        >
          {theme}
        </th>
        <td className="flex-1 px-4 py-2 text-center ">{totalHours}時間</td>
      </tr>
      <Modal
        isOpen={isModalOoen}
        onClose={handleCloseModal}
        title={`${theme}詳細`}
        studyHours={studyHours}
      />
    </>
  )
}
