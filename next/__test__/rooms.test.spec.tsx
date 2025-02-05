import { render, screen, waitFor } from '@testing-library/react'
import { useFetch } from '@/hooks/rooms/handleUseFetch'
import Rooms from '@/pages/current/rooms'

jest.mock('@/hooks/rooms/handleUseFetch')
jest.mock('@/hooks/useRequireSignIn')
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Rooms Page', () => {
  it('roomsが正しく表示される', async () => {
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

    ;(useFetch as jest.Mock).mockReturnValue({
      user: { isSignedIn: true },
      rooms: mockRooms,
      users: mockUsers,
      error: null,
      setRooms: jest.fn(),
    })

    render(<Rooms />)

    await waitFor(() => {
      expect(screen.getByText('チャットルーム')).toBeInTheDocument()
      expect(screen.getByText('Doe John')).toBeInTheDocument() 
      expect(screen.getByText('Smith Jane')).toBeInTheDocument() 
    })
  })
})
