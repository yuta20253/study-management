import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router' 
import ShowUniversityData from '../../src/pages/current/schools/[school_id]'
import { useDataState } from '@/hooks/schools/useDataState'
import { useUserState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

jest.mock('@/hooks/schools/useDataState')
jest.mock('@/hooks/useRequireSignIn', () => ({
  useRequireSignedIn: jest.fn(),
}))
jest.mock('@/hooks/useGlobalState', () => ({
  useUserState: jest.fn(),
}))
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: jest.fn(), 
}))

describe('ShowUniversityData', () => {
  it('データが正常に取得されると、大学データが表示されること', async () => {
    const mockUser = { isSignedIn: true }
    ;(useUserState as jest.Mock).mockReturnValue([mockUser])

    // DataStateフックのモック
    ;(useDataState as jest.Mock).mockReturnValue({
      university: {
        uni: {
          school: 'モック大学',
          data: [
            { faculty: '学部 1' },
            { faculty: '学部 2' },
            { faculty: '学部 3' },
          ],
        },
      },
      school_id: '123',
    })

    ;(useRouter as jest.Mock).mockReturnValue({
      query: { school_id: '123' },
      push: jest.fn(),
      pathname: '/current/schools/[school_id]',
    })

    render(<ShowUniversityData />)

    await waitFor(() => screen.getByText(/モック大学/i))
    expect(screen.getByText(/学部 1/i)).toBeInTheDocument()
    expect(screen.getByText(/学部 2/i)).toBeInTheDocument()
    expect(screen.getByText(/学部 3/i)).toBeInTheDocument()
  })

  it('ユーザーがサインインしていない場合、リダイレクトされること', async () => {
    const mockUser = { isSignedIn: true }
    ;(useRequireSignedIn as jest.Mock).mockReturnValue([mockUser])

    ;(useDataState as jest.Mock).mockReturnValue({
      university: null,
      school_id: '123',
    })

    render(<ShowUniversityData />)

    await waitFor(() => screen.getByText(/データの取得に失敗しました/i))
  })

  it('ユーザーがサインインしていない場合、サインインページにリダイレクトされること', async () => {
    const mockUser = { isSignedIn: false }
    ;(useUserState as jest.Mock).mockReturnValue([mockUser])

    const mockNavigate = jest.fn()
    ;(useRequireSignedIn as jest.Mock).mockImplementation(() => {
      if (!mockUser.isSignedIn) {
        mockNavigate('/sign_in')
      }
    })

    render(<ShowUniversityData />)

    expect(mockNavigate).toHaveBeenCalledWith('/sign_in')
  })

  it('データの取得に失敗した場合、エラーメッセージが表示されること', async () => {
    const mockUser = { isSignedIn: true }
    ;(useUserState as jest.Mock).mockReturnValue([mockUser])

    ;(useDataState as jest.Mock).mockReturnValue({
      university: null, 
      school_id: '123',
    })

    render(<ShowUniversityData />)
    expect(screen.getByText(/データの取得に失敗しました/i)).toBeInTheDocument()
  })

  it('SchoolDataTableに正しいリンクが表示されること', async () => {
    const mockUser = { isSignedIn: true }
    ;(useUserState as jest.Mock).mockReturnValue([mockUser])
    ;(useDataState as jest.Mock).mockReturnValue({
      university: {
        uni: {
          school: 'モック大学',
          data: [
            {
              faculty: '学部 1',
              faculty_of_code: 'F1',
              department: '学科 1',
            },
            {
              faculty: '学部 2',
              faculty_of_code: 'F2',
              department: '学科 2',
            },
          ],
        },
      },
      school_id: '123',
    })

    render(<ShowUniversityData />)

    const links = screen.getAllByRole('link')

    expect(links[0].getAttribute('href')).toBe(
      '/current/schools/123/details/F1',
    )

    expect(links[1].getAttribute('href')).toBe(
      '/current/schools/123/details/F2',
    )
  })

  it('APIリクエストが失敗した場合、エラーメッセージが表示されること', async () => {
    const mockUser = { isSignedIn: true }
    ;(useUserState as jest.Mock).mockReturnValue([mockUser])

    const mockError = new Error('API Error')
    ;(axios.get as jest.Mock).mockRejectedValueOnce(mockError) 

    ;(useDataState as jest.Mock).mockReturnValue({
      university: null, 
      school_id: '123',
    })

    render(<ShowUniversityData />)

    await waitFor(() => screen.findByText(/データの取得に失敗しました/i))

    expect(screen.getByText(/データの取得に失敗しました/i)).toBeInTheDocument()
  })
})
