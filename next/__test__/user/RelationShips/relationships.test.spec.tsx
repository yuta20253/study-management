import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/router'
import { useClickFollowUserHandlers } from '@/hooks/user/RelationShips/clickFollowUser'
import { useClickUnFollowUserHandlers } from '@/hooks/user/RelationShips/clickUnFollowUser'
import { useFetch } from '@/hooks/user/RelationShips/handleUseFetch'
import Relationships from '@/pages/current/user/relationships'

// モック関数
jest.mock('@/hooks/user/RelationShips/clickFollowUser', () => ({
  useClickFollowUserHandlers: jest.fn(),
}))

jest.mock('@/hooks/user/RelationShips/clickUnFollowUser', () => ({
  useClickUnFollowUserHandlers: jest.fn(),
}))

jest.mock('@/hooks/user/RelationShips/handleUseFetch', () => ({
  useFetch: jest.fn(),
}))

// Mocking Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockUser = {
  id: 1,
  family_name: '山田',
  given_name: '太郎',
}

const mockUsers = [
  { id: 2, family_name: '鈴木', given_name: '一郎' },
  { id: 3, family_name: '高橋', given_name: '二郎' },
]

const mockFollowedIdsArr = [3] // 既にフォローしているユーザーID

const mockHandleClickFollowUser = jest.fn()
const mockHandleClickUnfollowUser = jest.fn()

// useFetch とハンドラー関数をモック
beforeEach(() => {
  ;(useFetch as jest.Mock).mockReturnValue({
    user: mockUser,
    users: mockUsers,
    followedIdsArr: mockFollowedIdsArr,
    error: null,
  })
  ;(useClickFollowUserHandlers as jest.Mock).mockReturnValue({
    handleClickFollowUser: mockHandleClickFollowUser,
  })
  ;(useClickUnFollowUserHandlers as jest.Mock).mockReturnValue({
    handleClickUnfollowUser: mockHandleClickUnfollowUser,
  })
  // Mock the useRouter hook to return a dummy router object
  ;(useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(), // You can mock other methods if needed
    query: {},
    pathname: '/',
    asPath: '/',
  })
})

describe('Relationships', () => {
  test('Relationshipsコンポーネントの動作を検証する', async () => {
    // コンポーネントをレンダリング
    render(<Relationships />)

    // フォローボタンとフォロー解除ボタンを取得
    const followButtons = screen.getAllByText('フォロー')
    const unfollowButtons = screen.getAllByText('フォロー解除')

    // フォローボタンがクリックされた場合
    fireEvent.click(followButtons[0])

    // フォロー処理が呼ばれたか確認
    expect(mockHandleClickFollowUser).toHaveBeenCalledTimes(1)
    expect(mockHandleClickFollowUser).toHaveBeenCalledWith(mockUsers[0].id)

    // フォロー解除ボタンがクリックされた場合
    fireEvent.click(unfollowButtons[0])

    // フォロー解除処理が呼ばれたか確認
    expect(mockHandleClickUnfollowUser).toHaveBeenCalledTimes(1)
    expect(mockHandleClickUnfollowUser).toHaveBeenCalledWith(mockUsers[1].id)

    // エラーが発生した場合
    ;(useFetch as jest.Mock).mockReturnValue({
      user: mockUser,
      users: null,
      followedIdsArr: [],
      error: 'ネットワークエラー',
    })

    // コンポーネントを再レンダリング
    render(<Relationships />)

    // エラーメッセージが表示されることを確認
    expect(screen.getByText('ホームへ')).toBeInTheDocument()
  })
})
