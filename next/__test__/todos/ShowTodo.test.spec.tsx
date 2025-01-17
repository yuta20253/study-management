import { screen, render } from '@testing-library/react'
import { useRouter } from 'next/router'
import TodoDetail from '../../src/pages/current/todos/[id]' // Adjust path based on your file structure
import { DataState } from '@/hooks/todos/Show/DataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
jest.mock('@/hooks/ui/todos/Show/DataState', () => ({
  DataState: jest.fn(),
}))

// If `useRequireSignedIn` is a named export, mock it like this:
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

  it('should render loading state when todo and id are not available', () => {
    // Mock DataState hook to return undefined for todo and id
    ;(DataState as jest.Mock).mockReturnValue({
      todo: null,
      id: null,
    })

    render(<TodoDetail />)

    expect(screen.getByText(/Loading.../)).toBeInTheDocument()
  })

  it('should render TodoDetailTable when todo and id are available', async () => {
    const mockTodo = { title: 'Test Todo', description: 'This is a test todo' }
    const mockId = 1
    ;(DataState as jest.Mock).mockReturnValue({
      todo: mockTodo,
      id: mockId,
    })

    render(<TodoDetail />)

    expect(await screen.getByText(mockTodo.title)).toBeInTheDocument()
    expect(await screen.getByText(mockTodo.description)).toBeInTheDocument()
  })

  it('should call useRequireSignedIn and redirect if not signed in', () => {
    // Simulate the user not being signed in
    ;(useRequireSignedIn as jest.Mock).mockImplementation(() => {
      // Here, you can mock what happens when the user isn't signed in.
      // You could check if the user is redirected or sign-in modal shows up, etc.
      //Example behavior when not signed in
      mockPush('/sign-in')
    })
    render(<TodoDetail />)

    // Verify that the sign-in redirect happens
    expect(mockPush).toHaveBeenCalledWith('/sign-in')
  })
})
