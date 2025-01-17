import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'

type RoomProps = {
  id: number
  chat_room: {
    id: number
  }
  other_user: {
    family_name: string
    given_name: string
    id: number
  }
}

type UsersProps = {
  id: number
  family_name: string
  given_name: string
}

export const useCreateRoom = (
  user: UsersProps,
  setMessage: Dispatch<SetStateAction<string | null>>,
  setRooms: Dispatch<SetStateAction<RoomProps[]>>,
) => {
  // ユーザー情報とルーム情報を取得
  const createRoom = async (
    user_id: number,
    firstName: string,
    secondName: string,
  ) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/rooms'
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    const data = {
      like: { from_user_id: user.id, to_user_id: user_id },
      room_name: `${firstName} と ${secondName} のチャットルーム`,
    }

    try {
      const res = await axios.post(url, data, { headers: headers })
      if (res.data.status === 200) {
        setRooms((prevRooms) => [...prevRooms, res.data.rooms]) // 新しく作成されたチャットルームを追加
        setMessage('チャットルームが作成されました！')
        window.location.reload()
      } else {
        setMessage(res.data.message || '作成に失敗しました')
      }
    } catch (error: unknown) {
      console.error('予期しないエラーが発生しました:', error)
      setMessage('予期しないエラーが発生しました')
    }
  }
  return {
    createRoom,
  }
}
