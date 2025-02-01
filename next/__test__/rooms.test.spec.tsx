import { render, screen, waitFor } from '@testing-library/react'
import { useFetch } from '@/hooks/rooms/handleUseFetch'
import Rooms from '@/pages/current/rooms'

// Mock the useFetch hook to return mock data for rooms
jest.mock('@/hooks/rooms/handleUseFetch')
jest.mock('@/hooks/useRequireSignIn')
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Rooms Page', () => {
  it('should display rooms correctly', async () => {
    // Define mock rooms and users
    const mockRooms = [
      {
        chat_room: { id: 1 },
        other_user: { family_name: 'Doe', given_name: 'John' },
      },
      {
        chat_room: { id: 2 },
        other_user: { family_name: 'Smith', given_name: 'Jane' },
      },
    ]
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ]

    // Mock the useFetch hook to return the data
    ;(useFetch as jest.Mock).mockReturnValue({
      user: { isSignedIn: true },
      rooms: mockRooms,
      users: mockUsers,
      error: null,
      setRooms: jest.fn(),
    })

    // Render the Rooms component
    render(<Rooms />)

    // Wait for the rooms to be displayed
    await waitFor(() => {
      expect(screen.getByText('チャットルーム')).toBeInTheDocument()
      expect(screen.getByText('Doe John')).toBeInTheDocument() // Checking full name of room 1 user
      expect(screen.getByText('Smith Jane')).toBeInTheDocument() // Checking full name of room 2 user
    })
  })
})
