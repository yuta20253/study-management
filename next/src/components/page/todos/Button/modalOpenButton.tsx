type ButtonProps = {
  onOpen: () => void
  text: string
}

const ModalOpenButton = ({ onOpen, text }: ButtonProps) => {
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
