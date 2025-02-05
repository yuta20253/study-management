import { render, screen, waitFor } from '@testing-library/react'
//import useSWR from 'swr'
import Home from '../src/pages/current/home'
//import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

jest.mock('@/utils', () => ({
  fetcher: jest.fn(),
}))

jest.mock('@/hooks/useRequireSignIn', () => ({
  useRequireSignedIn: jest.fn(),
}))

describe('Home Component', () => {
  beforeEach(() => {
    require('@/utils').fetcher.mockResolvedValue({
      message: 'Welcome to Home!',
    })
  })

  test('fetchされたデータが表示される', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Welcome to Home!')).toBeInTheDocument()
    })
  })
})
