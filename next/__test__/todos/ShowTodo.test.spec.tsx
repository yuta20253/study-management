import { screen, render } from '@testing-library/react'
import { useRouter } from 'next/router'
import TodoDetail from '../../src/pages/current/todos/[id]' // Adjust path based on your file structure
import { DataState } from '@/hooks/todos/Show/useDataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
jest.mock('@/hooks/todos/Show/DataState', () => ({
  DataState: jest.fn(),
}))

jest.mock('@/hooks/useRequireSignIn', () => ({
  useRequireSignedIn: jest.fn(),
}))

describe('TodoDetail', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })

    jest.clearAllMocks()
  })

  it('Todoやidが利用できない時、Loading...が表示', () => {
    ;(DataState as jest.Mock).mockReturnValue({
      todo: null,
      id: null,
    })

    render(<TodoDetail />)

    expect(screen.getByText(/Loading.../)).toBeInTheDocument()
  })

  it('Todoやidが利用できる時、TodoDetailTableが表示される', async () => {
    const mockTodo = { title: 'Test Todo', description: 'テストです' }
    const mockId = 1
    ;(DataState as jest.Mock).mockReturnValue({
      todo: mockTodo,
      id: mockId,
    })

    render(<TodoDetail />)

    expect(await screen.getByText(mockTodo.title)).toBeInTheDocument()
    expect(await screen.getByText(mockTodo.description)).toBeInTheDocument()
  })

  it('useRequireSignedInを呼び出し、サインインしていない場合はリダイレクト', () => {
    ;(useRequireSignedIn as jest.Mock).mockImplementation(() => {
      mockPush('/sign-in')
    })
    render(<TodoDetail />)
    expect(mockPush).toHaveBeenCalledWith('/sign-in')
  })
})
