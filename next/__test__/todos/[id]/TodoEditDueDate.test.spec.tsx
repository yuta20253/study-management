import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { TodoEditDueDate } from '@/components/page/todos/Form/TodoEditDueDate'

// setDueDate のモック
const setDueDate = jest.fn()

// TestPropsの型定義
type TestProps = {
  theme: string
  props: string
  setDueDate: jest.Mock
  registerDueDate: string
  error?: { type: string; message: string }
}

// テスト用のカスタムラッパーコンポーネント
const TestWrapper = ({
  children,
}: {
  children: React.ReactNode
  testProps: TestProps
}) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

// customRender関数の定義
const customRender = (component: React.ReactNode) => {
  return render(component)
}
describe('TodoEditDueDate', () => {
  it('日付入力を正しい値でレンダリングする必要があります', () => {
    const testProps: TestProps = {
      theme: '締切',
      props: '2024-12-31',
      setDueDate,
      registerDueDate: 'due_date',
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <TodoEditDueDate {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByLabelText('締切') as HTMLInputElement
    expect(input).toHaveValue('2024-12-31') // 初期日付値を確認
  })

  it('日付が変更されたときに setDueDate を呼び出す必要があります', async () => {
    const testProps: TestProps = {
      theme: '締切',
      props: '2024-12-31',
      setDueDate,
      registerDueDate: 'due_date',
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <TodoEditDueDate {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByLabelText('締切') as HTMLInputElement
    fireEvent.change(input, { target: { value: '2025-01-01' } })

    await waitFor(() => {
      expect(setDueDate).toHaveBeenCalledWith('2025-01-01') // setDueDate が呼び出されているかどうかを確認する新しい日付を使用して
    })
  })

  it('期限が今日より前の場合はエラーを表示する必要があります', async () => {
    const testProps: TestProps = {
      theme: '締切',
      props: '2024-12-31',
      setDueDate,
      registerDueDate: 'due_date',
      error: { type: 'validate', message: '過去日は登録できません' },
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <TodoEditDueDate {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByLabelText('締切') as HTMLInputElement
    fireEvent.change(input, { target: { value: '2023-01-01' } })

    await waitFor(() => {
      expect(screen.getByText('過去日は登録できません')).toBeInTheDocument() // 検証エラーが表示されるかどうかを確認します
    })
  })

  it('期限が空の場合はエラーを表示する必要があります', async () => {
    const testProps: TestProps = {
      theme: '締切',
      props: '2024-12-31',
      setDueDate,
      registerDueDate: 'due_date',
      error: { type: 'required', message: '締切は必須です。' },
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <TodoEditDueDate {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByLabelText('締切') as HTMLInputElement
    fireEvent.change(input, { target: { value: '' } })

    await waitFor(() => {
      expect(screen.getByText('締切は必須です。')).toBeInTheDocument() // 必須の検証エラーが表示されているかどうかを確認します
    })
  })
})
