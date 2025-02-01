type ThemeProps = {
  theme: string
}

export const Theme = ({ theme }: ThemeProps) => {
  return (
    <tbody>
      <tr>
        <th className="h-12 w-full bg-sky-700">
          <p className="flex h-12 items-center justify-center text-center text-2xl text-white">
            {theme}
          </p>
        </th>
      </tr>
    </tbody>
  )
}
