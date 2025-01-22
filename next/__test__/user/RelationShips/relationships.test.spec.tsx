import { render, screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Relationships from '../../../src/pages/current/user/relationships'
import { useUserState } from '@/hooks/useGlobalState'
import { DataState } from '@/hooks/user/RelationShips/DataState'

// Mock necessary hooks
jest.mock('@/hooks/useGlobalState', () => ({
  useUserState: jest.fn(),
}))

jest.mock('@/hooks/ui/user/RelationShips/DataState', () => ({
  DataState: jest.fn(),
}))

// Mock Axios
jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// Create a mock response for the API
const mockUsers = [
  {
    id: 1,
    family_name: '田中',
    given_name: '太郎',
  },
  {
    id: 2,
    family_name: '鈴木',
    given_name: '次郎',
  },
]

describe('Relationships', () => {
  beforeEach(() => {
    // Mock useRouter to prevent the NextRouter error
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: {},
      pathname: '/current/user/relationships',
    })
  })

  it('should render a list of users and follow/unfollow buttons', async () => {
    const mockUser = {
      isSignedIn: true,
    }

    const mockFollowedIdsArr = [1] // User 1 is followed

    // Mock the user state and API response
    ;(useUserState as jest.Mock).mockReturnValue([mockUser])
    ;(DataState as jest.Mock).mockReturnValue({
      user: mockUser,
      users: mockUsers,
      followedIdsArr: mockFollowedIdsArr,
      handleClickfollowUser: jest.fn(),
      handleClickUnfollowUser: jest.fn(),
    })

    // Mock axios to return users
    ;(axios.get as jest.Mock).mockResolvedValue({
      data: mockUsers,
    })

    render(<Relationships />)

    // Check if user names are displayed
    expect(screen.getByText('田中太郎')).toBeInTheDocument()
    expect(screen.getByText('鈴木次郎')).toBeInTheDocument()

    // Get all "フォロー" buttons (it will return both buttons in the list)
    const buttons = screen.getAllByText('フォロー')
    expect(buttons.length).toBe(1) // Only one follow button for non-followed user (鈴木次郎)
    expect(buttons[0]).toBeInTheDocument()

    // Get all "フォロー解除" buttons (there should be one for the followed user)
    const unfollowButtons = screen.getAllByText('フォロー解除')
    expect(unfollowButtons.length).toBe(1) // Only one unfollow button for followed user (田中太郎)
    expect(unfollowButtons[0]).toBeInTheDocument()

    // Check the links for following and followers pages
    expect(screen.getByRole('link', { name: 'フォロー中' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'フォローワー' }),
    ).toBeInTheDocument()
  })

  it('should trigger handleClickfollowUser when "フォロー" button is clicked', async () => {
    const mockUser = {
      isSignedIn: true,
    }

    const mockFollowedIdsArr: number[] = [] // No user is followed initially
    const mockHandleClickfollowUser = jest.fn()

    // Mock the user state and API response
    ;(useUserState as jest.Mock).mockReturnValue([mockUser])
    ;(DataState as jest.Mock).mockReturnValue({
      user: mockUser,
      users: mockUsers,
      followedIdsArr: mockFollowedIdsArr,
      handleClickfollowUser: mockHandleClickfollowUser,
      handleClickUnfollowUser: jest.fn(),
    })

    // Mock axios to return users
    ;(axios.get as jest.Mock).mockResolvedValue({
      data: mockUsers,
    })

    render(<Relationships />)

    // Get all "フォロー" buttons
    const followButtons = screen.getAllByText('フォロー')
    fireEvent.click(followButtons[0]) // Click the first "フォロー" button

    // Ensure the handleClickfollowUser function is called
    expect(mockHandleClickfollowUser).toHaveBeenCalledTimes(1)
  })

  it('should trigger handleClickUnfollowUser when "フォロー解除" button is clicked', async () => {
    const mockUser = {
      isSignedIn: true,
    }

    const mockFollowedIdsArr = [1] // User 1 is followed
    const mockHandleClickUnfollowUser = jest.fn()

    // Mock the user state and API response
    ;(useUserState as jest.Mock).mockReturnValue([mockUser])
    ;(DataState as jest.Mock).mockReturnValue({
      user: mockUser,
      users: mockUsers,
      followedIdsArr: mockFollowedIdsArr,
      handleClickfollowUser: jest.fn(),
      handleClickUnfollowUser: mockHandleClickUnfollowUser,
    })

    // Mock axios to return users
    ;(axios.get as jest.Mock).mockResolvedValue({
      data: mockUsers,
    })

    render(<Relationships />)

    // Get all "フォロー解除" buttons
    const unfollowButtons = screen.getAllByText('フォロー解除')
    fireEvent.click(unfollowButtons[0]) // Click the "フォロー解除" button for the followed user

    // Ensure the handleClickUnfollowUser function is called
    expect(mockHandleClickUnfollowUser).toHaveBeenCalledTimes(1)
  })

  it('should display the "ホームへ" button and navigate correctly', () => {
    render(<Relationships />)

    // Check if the "ホームへ" button is rendered
    const homeButton = screen.getByRole('link', { name: 'ホームへ' })
    expect(homeButton).toBeInTheDocument()
    expect(homeButton.closest('a')).toHaveAttribute('href', '/current/home')
  })
})
