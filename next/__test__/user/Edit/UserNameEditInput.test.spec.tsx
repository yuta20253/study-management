import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { UserNameEditInput } from '@/components/page/user/Form/UserNameEditInput'

type TestProps = {
  theme: string
  first: string
  last: string
  label_first: string
  label_second: string
  registerFirstProps: string
  registerSecondProps: string
  rules?: {
    required: string
    pattern?: {
      value: RegExp
      message: string
    }
  }
  errorFirst?: { type: string; message: string }
  errorSecond?: { type: string; message: string }
}

const TestWrapper = ({
  children,
}: {
  children: React.ReactNode
  testProps: TestProps
}) => {
  const method = useForm()
  return <FormProvider {...method}>{children}</FormProvider>
}

const customRender = (component: React.ReactNode) => {
  return render(component)
}

describe('UserNameEditInput', () => {
  it('入力欄が初期値でレンダリングされること', () => {
    const testProps = {
      theme: '氏名カナ',
      first: 'タナカ',
      last: 'タロウ',
      label_first: '氏名カナ（姓)',
      label_second: '氏名カナ（名)',
      registerFirstProps: 'user.family_name_kana',
      registerSecondProps: 'user.given_name_kana',
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <UserNameEditInput {...testProps} />
      </TestWrapper>,
    )

    const input1 = screen.getByLabelText('氏名カナ（姓)') as HTMLInputElement
    const input2 = screen.getByLabelText('氏名カナ（名)') as HTMLInputElement

    expect(input1).toHaveValue('タナカ')
    expect(input2).toHaveValue('タロウ')
  })

  it('氏名カナ（姓）が空の場合にバリデーションエラーが表示されること', async () => {
    const testProps = {
      theme: '氏名カナ',
      first: 'ヤマダ',
      last: 'タロウ',
      label_first: '氏名カナ（姓)',
      label_second: '氏名カナ（名)',
      registerFirstProps: 'user.family_name_kana',
      registerSecondProps: 'user.given_name_kana',
      rules: {
        required: '入力必須です',
        pattern: {
          value: /^[ァ-ンヴー]*$/,
          message: 'カタカナで入力してください',
        },
      },
      errorFirst: { type: 'required', message: '入力必須です' },
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <UserNameEditInput {...testProps} />
      </TestWrapper>,
    )

    fireEvent.change(screen.getByLabelText('氏名カナ（姓)'), {
      target: { value: '' },
    })

    await waitFor(() => {
      expect(screen.queryByText('入力必須です')).toBeInTheDocument()
    })
  })

  it('氏名カナ（姓）がカタカナでない場合にパターンエラーが表示されること', async () => {
    const testProps = {
      theme: '氏名カナ',
      first: 'ヤマダ',
      last: 'タロウ',
      label_first: '氏名カナ（姓)',
      label_second: '氏名カナ（名)',
      registerFirstProps: 'user.family_name_kana',
      registerSecondProps: 'user.given_name_kana',
      rules: {
        required: '入力必須です',
        pattern: {
          value: /^[ァ-ンヴー]*$/,
          message: 'カタカナで入力してください',
        },
      },
      errorSecond: { type: 'pattern', message: 'カタカナで入力してください' },
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <UserNameEditInput {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByLabelText('氏名カナ（姓)') as HTMLInputElement
    fireEvent.change(input, { target: { value: '山田' } })

    await waitFor(() => {
      expect(
        screen.queryByText('カタカナで入力してください'),
      ).toBeInTheDocument()
    })
  })

  it('氏名カナ（姓）と氏名カナ（名）が正しいカタカナで入力された場合、エラーメッセージが表示されないこと', async () => {
    const testProps = {
      theme: '氏名カナ',
      first: 'ヤマダ',
      last: 'タロウ',
      label_first: '氏名カナ（姓)',
      label_second: '氏名カナ（名)',
      registerFirstProps: 'user.family_name_kana',
      registerSecondProps: 'user.given_name_kana',
      rules: {
        required: '入力必須です',
        pattern: {
          value: /^[ァ-ンヴー]*$/,
          message: 'カタカナで入力してください',
        },
      },
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <UserNameEditInput {...testProps} />
      </TestWrapper>,
    )

    fireEvent.change(screen.getByLabelText('氏名カナ（姓)'), {
      target: { value: 'ヤマダ' },
    })
    fireEvent.change(screen.getByLabelText('氏名カナ（名)'), {
      target: { value: 'タロウ' },
    })

    await waitFor(() => {
      expect(screen.queryByText('入力必須です')).not.toBeInTheDocument()
      expect(
        screen.queryByText('カタカナで入力してください'),
      ).not.toBeInTheDocument()
    })
  })
})
