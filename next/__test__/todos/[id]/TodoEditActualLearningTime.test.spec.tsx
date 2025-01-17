import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { TodoEditActualLearningTime } from '@/components/page/todos/Form/TodoEditActualLearningTimeInput'

// Mock useForm properly
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    setValue: jest.fn(),
    formState: { errors: {} },
  })),
}))

describe('TodoEditActualLearningTime', () => {
  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
  }

  it('正しい初期値が表示されること', () => {
    const testProps = {
      theme: '学習時間',
      actualLearningTime: '2',
      registerActualLearningTime: 'actualLearningTime',
      setScheduledStudyTime: jest.fn(),
      setActualLearningTime: jest.fn(),
      setTotalHour: jest.fn(),
      handleChangeHours: jest.fn(),
    }

    render(
      <TestWrapper>
        <TodoEditActualLearningTime {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByRole('spinbutton') as HTMLInputElement
    expect(input.value).toBe('2')
  })

  it('値が変更されたときにsetActualLearningTimeが呼ばれること', async () => {
    const setActualLearningTime = jest.fn()
    const setTotalHour = jest.fn()

    const testProps = {
      theme: '学習時間',
      actualLearningTime: '2',
      registerActualLearningTime: 'actualLearningTime',
      setScheduledStudyTime: jest.fn(),
      setActualLearningTime,
      setTotalHour,
      handleChangeHours: jest.fn(),
    }

    render(
      <TestWrapper>
        <TodoEditActualLearningTime {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByRole('spinbutton') as HTMLInputElement
    fireEvent.change(input, { target: { value: '3' } })

    await waitFor(() => {
      expect(setActualLearningTime).toHaveBeenCalledWith('3') // setActualLearningTime should be called
    })
  })

  it('値が無効な場合にエラーメッセージが表示されること', async () => {
    const error = { type: 'min', message: '最小値は1時間です。' }
    const testProps = {
      theme: '学習時間',
      actualLearningTime: '',
      registerActualLearningTime: 'actualLearningTime',
      setScheduledStudyTime: jest.fn(),
      setActualLearningTime: jest.fn(),
      setTotalHour: jest.fn(),
      handleChangeHours: jest.fn(),
      rules: {
        required: 'このフィールドは必須です。',
        min: { value: 1, message: '最小値は1時間です。' },
        max: { value: 24, message: '最大値は24時間です。' },
      },
      error,
    }

    render(
      <TestWrapper>
        <TodoEditActualLearningTime {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByRole('spinbutton') as HTMLInputElement
    fireEvent.change(input, { target: { value: '' } }) // Empty value, should trigger error

    await waitFor(() => {
      expect(screen.getByText('最小値は1時間です。')).toBeInTheDocument()
    })
  })

  it('onBlurイベントが正しく処理されること', async () => {
    const setTotalHour = jest.fn()
    const testProps = {
      theme: '学習時間',
      actualLearningTime: '2',
      registerActualLearningTime: 'actualLearningTime',
      setScheduledStudyTime: jest.fn(),
      setActualLearningTime: jest.fn(),
      setTotalHour,
      handleChangeHours: jest.fn(),
    }

    render(
      <TestWrapper>
        <TodoEditActualLearningTime {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByRole('spinbutton') as HTMLInputElement

    fireEvent.blur(input) // Trigger the blur event

    await waitFor(() => {
      expect(setTotalHour).toHaveBeenCalledWith(expect.any(Function)) // Ensure totalHour is updated onBlur
    })
  })

  it('フィールドがクリアされたときにtotalHourが減少すること', async () => {
    const setTotalHour = jest.fn()
    const testProps = {
      theme: '学習時間',
      actualLearningTime: '2',
      registerActualLearningTime: 'actualLearningTime',
      setScheduledStudyTime: jest.fn(),
      setActualLearningTime: jest.fn(),
      setTotalHour,
      handleChangeHours: jest.fn(),
    }

    render(
      <TestWrapper>
        <TodoEditActualLearningTime {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByRole('spinbutton') as HTMLInputElement
    fireEvent.change(input, { target: { value: '' } }) // Clear the field

    await waitFor(() => {
      expect(setTotalHour).toHaveBeenCalledWith(expect.any(Function)) // Ensure totalHour is updated correctly after clearing the input
    })
  })
})
