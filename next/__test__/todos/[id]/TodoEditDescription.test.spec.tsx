import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { TodoEditDescription } from '@/components/page/todos/Form/TodoEditDescription'
import { descriptionRules } from '@/validations/todos/validation'

// mock useFormContext from react-hook-form
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: jest.fn(() => ({
    register: jest.fn(),
  })),
}))

describe('TodoEditDescription', () => {
  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
  }

  it('初期値が正しく表示されること', () => {
    const testProps = {
      theme: '説明',
      props: '初期の説明',
      registerDescription: 'description',
      setDescription: jest.fn(),
    }

    render(
      <TestWrapper>
        <TodoEditDescription {...testProps} />
      </TestWrapper>,
    )

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(textarea).toHaveValue('初期の説明')
  })

  it('値が変更されると setDescription が呼ばれること', async () => {
    const setDescription = jest.fn()
    const testProps = {
      theme: '説明',
      props: '初期の説明',
      registerDescription: 'description',
      setDescription,
    }

    render(
      <TestWrapper>
        <TodoEditDescription {...testProps} />
      </TestWrapper>,
    )

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: '更新された説明' } })

    await waitFor(() => {
      expect(setDescription).toHaveBeenCalledWith('更新された説明')
    })
  })

  it('maxLength バリデーションに失敗した場合、エラーメッセージが表示されること', async () => {
    const error = { message: '200字まで入力は可能です', type: 'maxLength' }
    const testProps = {
      theme: '説明',
      props: '',
      registerDescription: 'description',
      setDescription: jest.fn(),
      rules: descriptionRules, // maxLength バリデーションを適用
      error,
    }

    render(
      <TestWrapper>
        <TodoEditDescription {...testProps} />
      </TestWrapper>,
    )

    // 200文字を超える入力をシミュレート
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'A'.repeat(201) } })

    await waitFor(() => {
      // エラーメッセージが表示されることを確認
      expect(screen.getByText('200字まで入力は可能です')).toBeInTheDocument()
    })
  })

  it('入力が有効な場合、エラーメッセージが表示されないこと', async () => {
    const testProps = {
      theme: '説明',
      props: '',
      registerDescription: 'description',
      setDescription: jest.fn(),
      rules: descriptionRules, // maxLength バリデーションを適用
      error: undefined,
    }

    render(
      <TestWrapper>
        <TodoEditDescription {...testProps} />
      </TestWrapper>,
    )

    // 有効な入力（200文字未満）をシミュレート
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: '有効な説明' } })

    await waitFor(() => {
      // エラーメッセージが表示されていないことを確認
      expect(
        screen.queryByText('200字まで入力は可能です'),
      ).not.toBeInTheDocument()
    })
  })
})
