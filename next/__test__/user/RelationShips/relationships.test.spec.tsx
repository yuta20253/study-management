import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/router'
import { useClickFollowUserHandlers } from '@/hooks/user/RelationShips/clickFollowUser'
import { useClickUnFollowUserHandlers } from '@/hooks/user/RelationShips/clickUnFollowUser'
import { useFetch } from '@/hooks/user/RelationShips/handleUseFetch'
import Relationships from '@/pages/current/user/relationships'

jest.mock('@/hooks/user/RelationShips/clickFollowUser', () => ({
  useClickFollowUserHandlers: jest.fn(),
}))

jest.mock('@/hooks/user/RelationShips/clickUnFollowUser', () => ({
  useClickUnFollowUserHandlers: jest.fn(),
}))

jest.mock('@/hooks/user/RelationShips/handleUseFetch', () => ({
  useFetch: jest.fn(),
}))

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

const mockFollowedIdsArr = [3] 

const mockHandleClickFollowUser = jest.fn()
const mockHandleClickUnfollowUser = jest.fn()

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

  ;(useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(), 
    query: {},
    pathname: '/',
    asPath: '/',
  })
})

describe('Relationships', () => {
  test('Relationshipsコンポーネントの動作を検証する', async () => {
    render(<Relationships />)

    const followButtons = screen.getAllByText('フォロー')
    const unfollowButtons = screen.getAllByText('フォロー解除')

    fireEvent.click(followButtons[0])

    expect(mockHandleClickFollowUser).toHaveBeenCalledTimes(1)
    expect(mockHandleClickFollowUser).toHaveBeenCalledWith(mockUsers[0].id)

    fireEvent.click(unfollowButtons[0])

    expect(mockHandleClickUnfollowUser).toHaveBeenCalledTimes(1)
    expect(mockHandleClickUnfollowUser).toHaveBeenCalledWith(mockUsers[1].id)

    ;(useFetch as jest.Mock).mockReturnValue({
      user: mockUser,
      users: null,
      followedIdsArr: [],
      error: 'ネットワークエラー',
    })

    render(<Relationships />)

    expect(screen.getByText('ホームへ')).toBeInTheDocument()
  })
})
