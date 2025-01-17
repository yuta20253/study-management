import { render, screen, waitFor } from '@testing-library/react'
//import useSWR from 'swr'
import Home from '../src/pages/current/home'
//import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

// fetcher をモック
jest.mock('@/utils', () => ({
  fetcher: jest.fn(),
}))

// useRequireSignedIn をモック
jest.mock('@/hooks/useRequireSignIn', () => ({
  useRequireSignedIn: jest.fn(),
}))

describe('Home Component', () => {
  beforeEach(() => {
    // fetcher モックのレスポンスを設定
    require('@/utils').fetcher.mockResolvedValue({
      message: 'Welcome to Home!',
    }) // モックされたfetcherの返り値
  })

  test('should render the fetched data', async () => {
    render(<Home />)

    // データが読み込まれた後に表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('Welcome to Home!')).toBeInTheDocument()
    })
  })
})
