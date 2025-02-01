import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { UserPhoneEditInput } from '@/components/page/user/Form/UserPhoneEditInput'

type PhoneProps = {
  theme: string
  props: string
  registerProps: string
  rules?: {
    required: string
    pattern?: {
      value: RegExp
      message: string
    }
  }
  error?: { type: string; message: string }
}

jest.mock('axios')

const TestWrapper = ({
  children,
}: {
  children: React.ReactNode
  testProps: PhoneProps
}) => {
  const method = useForm()
  return <FormProvider {...method}>{children}</FormProvider>
}

const customRender = (conponent: React.ReactNode) => {
  return render(conponent)
}

describe('UserPhoneEditInput', () => {
  it('入力欄が初期値でレンダリングされること', () => {
    const testProps = {
      theme: '本人携帯',
      props: '09012345678',
      registerProps: 'telephone.phone_number',
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <UserPhoneEditInput {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByLabelText('本人携帯') as HTMLInputElement
    expect(input).toHaveValue('09012345678')
  })

  it('電話番号が正しくないformatの時、バリデーションエラーが発生する', async () => {
    const testProps = {
      theme: '本人携帯',
      props: '09012345678',
      registerProps: 'telephone.phone_number',
      rules: {
        required: '入力必須です',
        pattern: {
          value: /^0\d{1,4}-\d{1,4}-\d{3,4}$/,
          message: '携帯番号は不正です',
        },
      },
      error: { type: 'pattern', message: '携帯番号は不正です' },
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <UserPhoneEditInput {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByLabelText('本人携帯') as HTMLInputElement
    fireEvent.change(input, { target: { value: '00000000000000000' } })

    await waitFor(() => {
      expect(screen.queryByText('携帯番号は不正です')).toBeInTheDocument()
    })
  })

  it('電話番号が正しく入力されると、エラーメッセージが表示されない', async () => {
    const testProps = {
      theme: '本人携帯',
      props: '09012345678',
      registerProps: 'telephone.phone_number',
      rules: {
        required: '入力必須です',
        pattern: {
          value: /^0\d{1,4}-\d{1,4}-\d{3,4}$/,
          message: '携帯番号は不正です',
        },
      },
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <UserPhoneEditInput {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByLabelText('本人携帯') as HTMLInputElement

    fireEvent.change(input, { target: { value: '08012345678' } })
    expect(input.value).toBe('08012345678')
    await waitFor(() => {
      expect(screen.queryByText('入力必須です')).not.toBeInTheDocument()
      expect(screen.queryByText('携帯番号は不正です')).not.toBeInTheDocument()
    })
  })
})
