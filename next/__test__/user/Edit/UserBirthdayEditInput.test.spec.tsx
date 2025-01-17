import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useForm, FormProvider, FieldError } from 'react-hook-form'
import { UserBirthdayEditInput } from '@/components/page/user/Form/UserBirthdayEditInput' // パスは適宜変更してください

type TestProps = {
      theme: string
      date: string
      registerProps: string
      error?: {type: string, message: string}
}

const TestWrapper = ({
    children
}: {children: React.ReactNode 
    testProps: TestProps}) => {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
}

const customRender = (component: React.ReactNode) => {
    return render (component)
}

describe('UserBirthdayEditInput', () => {
  it('入力欄が初期値でレンダリングされること', () => {
    const testProps: TestProps = {
        theme: "生年月日",
        date: "1985-05-10",
        registerProps: "user.birthday",
    }

    customRender(
        <TestWrapper testProps={testProps} >
            <UserBirthdayEditInput {...testProps} />
        </TestWrapper>
    )

    const input = screen.getByLabelText('生年月日') as HTMLInputElement
    expect(input).toHaveValue('1985-05-10')
  })

  it('誕生日が未来の日付の場合、エラーメッセージが表示されること', async () => {
    const testProps: TestProps = {
        theme: "生年月日",
        date: "2005-05-18",
        registerProps: "user.birthday",
        error: { type: "validate", message: "未来日は登録できません" }
    }
    customRender(
        <TestWrapper testProps={testProps}>
            <UserBirthdayEditInput {...testProps} />
        </TestWrapper>
    )

    const input = screen.getByLabelText('生年月日') as HTMLInputElement
    fireEvent.change(input, { target: { value: "2025-01-01" } })

    await waitFor(() => {
        expect(screen.getByText('未来日は登録できません')).toBeInTheDocument()
    })
  })

  it('誕生日が空の場合、「誕生日は必須です。」のエラーメッセージが表示されること', async () => {
    const testProps: TestProps = {
        theme: "生年月日",
        date: "2005-05-18",
        registerProps: "user.birthday",
        error: { type: "required", message: "誕生日は必須です。" }
    }
    customRender(
        <TestWrapper testProps={testProps}>
            <UserBirthdayEditInput {...testProps} />
        </TestWrapper>
    )

    const input = screen.getByLabelText('生年月日') as HTMLInputElement
    // 誕生日欄を空にする
    fireEvent.change(input, { target: { value: "" }})

    // 「誕生日は必須です。」のエラーメッセージが表示されること
    await waitFor(() => {
      expect(screen.getByText('誕生日は必須です。')).toBeInTheDocument()
    })
  })

  it('誕生日が正しい日付の場合、エラーメッセージが表示されないこと', async () => {
    const testProps: TestProps = {
        theme: "生年月日",
        date: "2005-05-14",
        registerProps: "user.birthday",
    }
    customRender(
        <TestWrapper testProps={testProps}>
            <UserBirthdayEditInput {...testProps} />
        </TestWrapper>
    )
    const input = screen.getByLabelText('生年月日') as HTMLInputElement
    fireEvent.change(input, { target: { value: "2005-05-18" }})


    // エラーメッセージが表示されないこと
    await waitFor(() => {
      expect(screen.queryByText('誕生日は必須です。')).not.toBeInTheDocument()
      expect(screen.queryByText('未来日は登録できません')).not.toBeInTheDocument()
    })
  })
})
