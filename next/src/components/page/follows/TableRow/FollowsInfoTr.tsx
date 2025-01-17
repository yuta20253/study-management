type FollowsUserInfoProps = {
    first?: string | number
    second?: string| number
    third?: string| number
    four?: string| number
    five?: string| number
    six?: string| number
}

export const FollowsUserInfo = ({first, second, third, four, five, six}:FollowsUserInfoProps) => {
    return (
        <tr>
        <td className="h-12 border border-slate-500">
          <span className="flex h-10 items-center justify-center text-center text-2xl">
            {first}{second}{third}{four}{five}{six}
          </span>
        </td>
      </tr>
    )
}