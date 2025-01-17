import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import mockRouter from 'next-router-mock'
import { DataState } from '@/hooks/desired_schools/DataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import DesiredSchools from '@/pages/current/desired_schools'

// Mocking the hook and router
jest.mock('@/hooks/useRequireSignIn', () => ({
  useRequireSignedIn: jest.fn(),
}))
jest.mock('next/router', () => require('next-router-mock'))

// Mocking the API call
jest.mock('axios')

// Mocking DataState hook
jest.mock('@/hooks/ui/desired_schools/DataState', () => ({
  DataState: jest.fn(),
}))

describe('DesiredSchools Component', () => {
  const mockUniversities = [
    { school: 'Test University', code: '12345', faculty_of_code: '1' },
  ]

  beforeEach(() => {
    // Mocking useRequireSignedIn hook to return true
    ;(useRequireSignedIn as jest.Mock).mockReturnValue(true)

    // Mocking router push as jest.fn() so we can track calls
    mockRouter.push = jest.fn()

    // Mocking universities data in the DataState hook
    ;(DataState as jest.Mock).mockReturnValue({
      universities: undefined,
      jsonUniversity: [
        {
          uni: {
            school: 'Test University',
            data: [{ code: '12345', faculty_of_code: '1' }],
          },
        },
      ],
      setUniversities: jest.fn(),
      deleteId: null,
      setDeleteId: jest.fn(),
      isDelete: false,
      setIsDelete: jest.fn(),
      router: mockRouter,
      isValid: true,
      handleChangeInputValue: jest.fn(),
      error: null,
    })
  })

  it('renders the search form and buttons', async () => {
    // Mocking universities data in the DataState hook
    ;(DataState as jest.Mock).mockReturnValue({
      universities: mockUniversities,
      jsonUniversity: [
        {
          uni: {
            school: 'Test University',
            data: [{ code: '12345', faculty_of_code: '1' }],
          },
        },
      ],
      setUniversities: jest.fn(),
      deleteId: null,
      setDeleteId: jest.fn(),
      isDelete: false,
      setIsDelete: jest.fn(),
      router: mockRouter,
      isValid: true,
      handleChangeInputValue: jest.fn(),
      error: null,
    })
    render(<DesiredSchools />)

    // Wait for the "Loading..." text to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    // Ensure the form and buttons are rendered
    expect(screen.getByPlaceholderText('大学名を入力')).toBeInTheDocument()
    expect(screen.getByText('検索')).toBeInTheDocument()
    expect(screen.getByText('新規追加')).toBeInTheDocument()
    expect(screen.getByText('ホームへ')).toBeInTheDocument()
    expect(screen.getByText('検索ページへ移動 :')).toBeInTheDocument()
  })

  it('displays an error message if university is not found', async () => {
    // Mocking universities data in the DataState hook
    ;(DataState as jest.Mock).mockReturnValue({
      universities: mockUniversities,
      jsonUniversity: [
        {
          uni: {
            school: 'Test University',
            data: [{ code: '12345', faculty_of_code: '1' }],
          },
        },
      ],
      setUniversities: jest.fn(),
      deleteId: null,
      setDeleteId: jest.fn(),
      isDelete: false,
      setIsDelete: jest.fn(),
      router: mockRouter,
      isValid: true,
      handleChangeInputValue: jest.fn(),
      error: null,
    })
    render(<DesiredSchools />)

    // Wait for the "Loading..." text to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    const input = screen.getByPlaceholderText('大学名を入力')
    const submitButton = screen.getByText('検索')

    fireEvent.change(input, { target: { value: 'Nonexistent University' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('学校が見つかりません')).toBeInTheDocument()
    })
  })

  it('submits the form and redirects on success', async () => {
    // Mocking universities data in the DataState hook
    ;(DataState as jest.Mock).mockReturnValue({
      universities: mockUniversities,
      jsonUniversity: [
        {
          uni: {
            school: 'Test University',
            data: [{ code: '12345', faculty_of_code: '1' }],
          },
        },
      ],
      setUniversities: jest.fn(),
      deleteId: null,
      setDeleteId: jest.fn(),
      isDelete: false,
      setIsDelete: jest.fn(),
      router: mockRouter,
      isValid: true,
      handleChangeInputValue: jest.fn(),
      error: null,
    })
    // Mock the successful API response
    axios.get = jest.fn().mockResolvedValueOnce({
      data: { school: 'Test University', code: '12345', faculty_of_code: '1' }, // Return a valid university code
    })

    render(<DesiredSchools />)

    // Wait for the "Loading..." text to disappear
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull())

    const input = screen.getByPlaceholderText('大学名を入力')
    const submitButton = screen.getByText('検索')

    // Simulate user input
    fireEvent.change(input, { target: { value: 'Test University' } })
    fireEvent.click(submitButton)

    // Wait for the redirection (router.push)
    await waitFor(() => {
      // Adjust the URL to expect the details path based on your component logic
      expect(mockRouter.push).toHaveBeenCalledWith(
        '/current/schools/12345/details/1',
      )
    })
  })

  it('shows the loading state when universities are undefined', async () => {
    // Mocking the DataState hook to return undefined universities
    ;(DataState as jest.Mock).mockReturnValue({
      universities: undefined,
      jsonUniversity: [],
      setUniversities: jest.fn(),
      deleteId: null,
      setDeleteId: jest.fn(),
      isDelete: false,
      setIsDelete: jest.fn(),
      router: mockRouter,
      isValid: true,
      handleChangeInputValue: jest.fn(),
      error: null,
    })

    render(<DesiredSchools />)

    // Check if some kind of loading indicator is present (e.g., a spinner or a loading message)
    await waitFor(() => {
      const loadingElement = screen.queryByText('Loading...') // or adjust to match the actual element

      expect(loadingElement).toBeInTheDocument()
    })
  })
})
