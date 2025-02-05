import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { DataState } from '@/hooks/desired_schools/useDataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import DesiredSchools from '@/pages/current/desired_schools'

jest.mock('@/hooks/useRequireSignIn', () => ({
  useRequireSignedIn: jest.fn(),
}))
jest.mock('next/router', () => require('next-router-mock'))

jest.mock('axios')

jest.mock('@/hooks/desired_schools/DataState', () => ({
  DataState: jest.fn(),
}))

describe('DesiredSchools Component', () => {
  const mockUniversities = [
    { school: 'Test University', code: '12345', faculty_of_code: '1' },
  ]

  beforeEach(() => {
    ;(useRequireSignedIn as jest.Mock).mockReturnValue(true)

    mockRouter.push = jest.fn()

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

  it('searchformとbuttonが表示される', async () => {
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

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    expect(screen.getByPlaceholderText('大学名を入力')).toBeInTheDocument()
    expect(screen.getByText('検索')).toBeInTheDocument()
    expect(screen.getByText('新規追加')).toBeInTheDocument()
    expect(screen.getByText('ホームへ')).toBeInTheDocument()
    expect(screen.getByText('検索ページへ移動')).toBeInTheDocument()
  })

  it('universityが見つからなかったらError', async () => {
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
      error: '学校が見つかりません',
      setError: jest.fn(),
    })
    render(<DesiredSchools />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    const input = screen.getByPlaceholderText('大学名を入力')
    const submitButton = screen.getByText('検索')

    fireEvent.change(input, { target: { value: 'Nonexistent University' } })
    fireEvent.click(submitButton)

    const errorMessage = await screen.findByText(/学校が見つかりません/i)
    expect(errorMessage).toBeInTheDocument()
  })

  it('universitiesがundefinedの時、Loading...が表示される', async () => {
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

    await waitFor(() => {
      const loadingElement = screen.queryByText('Loading...') 

      expect(loadingElement).toBeInTheDocument()
    })
  })
})
