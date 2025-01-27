import { ButtonProps } from '@/types/User/Button/button'

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
