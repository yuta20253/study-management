import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/router'

import EditTodo from '../../../src/pages/current/todos/[id]/edit'

import { DataState } from '@/hooks/todos/Edit/DataState'

// Mocking necessary modules
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    query: { id: '1' },
  }),
}))

jest.mock('@/hooks/ui/todos/Edit/DataState', () => ({
  DataState: jest.fn(),
}))

describe('EditTodo', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    // Mocking useRouter hook
    ;(useRouter as jest.Mock).mockReturnValue(() => ({
      push: mockPush,
      query: { id: '1' }, // Simulating router query for ID
    }))

    // Mocking DataState hook
    ;(DataState as jest.Mock).mockReturnValue({
      todo: { title: 'テストTodo', description: 'テストの説明' },
      router: { push: mockPush },
      id: '1',
      title: 'テストTodo',
      setTitle: jest.fn(),
      scheduledStudyTime: '',
      setScheduledStudyTime: jest.fn(),
      subject: 'Math',
      setSubject: jest.fn(),
      progress: '未完了',
      setProgress: jest.fn(),
      importance: '中',
      setImportance: jest.fn(),
      actualLearningTime: '0',
      setActualLearningTime: jest.fn(),
      totalHour: 5,
      setTotalHour: jest.fn(),
      studyType: '授業',
      setStudyType: jest.fn(),
      selectedStars: 3,
      setSelectedStars: jest.fn(),
      dueDate: '2024-12-31',
      setDueDate: jest.fn(),
      description: 'テストの説明',
      setDescription: jest.fn(),
      handleChangeHours: jest.fn(),
    })
  })

  it('todoが読み込まれていない場合は「読み込み中...」と表示する必要があります', () => {
    ;(DataState as jest.Mock).mockReturnValue({
      todo: null,
      router: { push: mockPush },
      id: '1',
      title: '',
      setTitle: jest.fn(),
      scheduledStudyTime: '',
      setScheduledStudyTime: jest.fn(),
    })

    render(<EditTodo />)
    expect(screen.getByText(/Loading.../)).toBeInTheDocument()
  })

  it('todoが読み込まれたらフォームフィールドをレンダリングする必要があります', async () => {
    ;(DataState as jest.Mock).mockReturnValue({
      todo: { title: 'テストTodo', description: 'テストの説明' },
      router: { push: mockPush },
      id: '1',
      title: '',
      setTitle: jest.fn(),
      scheduledStudyTime: '',
      setScheduledStudyTime: jest.fn(),
    })
    render(<EditTodo />)

    // Using getByLabelText to check title and description inputs
    await waitFor(() => {
      expect(screen.getByTestId('title')).toHaveValue('テストTodo')
      expect(screen.getByTestId('description')).toHaveValue('テストの説明')
    })    
  })

  it('フォームが送信されたらonSubmitを呼び出します', async () => {
    render(<EditTodo />)

    fireEvent.change(screen.getByLabelText(/タイトル/i), {
      target: { value: 'Updated Todo' },
    })

    fireEvent.change(screen.getByTestId('description'), {
      // Changed here
      target: { value: 'Updated説明' },
    })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled()
    })
  })

  it('タイトルが更新されると、タイトルが変更されていることを確認します', async () => {
    render(<EditTodo />)

    // Change the title value
    fireEvent.change(screen.getByLabelText(/タイトル/i), {
      target: { value: 'Updated Todo' },
    })

    // Ensure the title input reflects the change
    expect(screen.getByLabelText(/タイトル/i)).toHaveValue('Updated Todo')
  })

  it('説明が更新されると、説明が変更されていることを確認します', async () => {
    render(<EditTodo />)

    // Change the description value
    fireEvent.change(screen.getByLabelText(/説明/i), {
      target: { value: 'Updated description' },
    })

    // Ensure the description input reflects the change
    expect(screen.getByLabelText(/説明/i)).toHaveValue('Updated description')
  })

  it('タイトルが空で送信された場合、エラーメッセージが表示される', async () => {
    render(<EditTodo />)

    fireEvent.change(screen.getByLabelText(/タイトル/i), {
      target: { value: '' },
    })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByText(/タイトルは必須です/i)).toBeInTheDocument()
    })
  })
})
