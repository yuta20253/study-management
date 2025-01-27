import { ModalOpenButtonProps } from '@/types/Todo/Button/button'

const ModalOpenButton = ({ onOpen, text }: ModalOpenButtonProps) => {
  return (
    <button
      onClick={onOpen}
      type="button"
      className="rounded bg-sky-500 px-3 py-1 text-white"
    >
      {text}
    </button>
  )
}

export default ModalOpenButton
