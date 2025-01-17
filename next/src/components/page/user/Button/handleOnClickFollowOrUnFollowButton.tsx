type ButtonProps = {
  onClick: (id: number) => void
  text: string
}

const OnClickFollowOrUnFollowButton = ({ onClick, text }: ButtonProps) => {
  return (
    <button
      onClick={() => onClick}
      className="rounded bg-sky-400 px-3 py-1 text-white"
    >
      {text}
    </button>
  )
}

export default OnClickFollowOrUnFollowButton
