// src/components/form/UserAddressInput.tsx
import { useFormContext, FieldError } from 'react-hook-form'

type AddressProps = {
  theme: string
  value: string
  registerProps: string
  error?: FieldError
}

export const UserAddressInput = ({
  theme,
  value,
  registerProps,
  error,
}: AddressProps) => {
  const { register, setValue } = useFormContext()

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(registerProps, e.target.value) // 手動で変更された住所をフォームに反映
  }

  return (
    <tr>
      <th className="h-12 items-center justify-center border border-slate-500">
        <p className="flex h-12 items-center justify-center bg-sky-600 text-center text-xl text-white">
          {theme}
        </p>
      </th>
      <td className="border border-slate-500">
        <input
          type="text"
          defaultValue={value}
          {...register(registerProps)}
          onChange={handleAddressChange}
        />
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </td>
    </tr>
  )
}
