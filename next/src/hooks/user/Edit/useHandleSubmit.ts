import { NextRouter } from 'next/router'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { onSubmitHandler } from './handleOnSubmit'
import { EditUserProps } from '@/types/User'
import { userEditType } from '@/types/User/edit'

export const useHandleSubmit = (
  user: userEditType,
  setUser: (value: userEditType) => void,
  router: NextRouter,
) => {
  const methods = useForm<EditUserProps>({
    defaultValues: user,
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const handleOnSubmit: SubmitHandler<EditUserProps> = (data) => {
    onSubmitHandler(user, setUser, router, data)
  }

  const handleOnError: SubmitErrorHandler<EditUserProps> = (errors) => {
    console.log('error', errors)
  }

  return {
    handleSubmit,
    handleOnSubmit,
    handleOnError,
    methods,
    errors,
  }
}
