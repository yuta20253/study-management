import { createConsumer, Subscription } from '@rails/actioncable'

// WebSocket URL
const wsUrl = `ws://${window.location.hostname}:3000/cable`

// Function to get headers for authentication
const getAuthHeaders = (): Record<string, string> => {
  const csrfToken =
    document.querySelector('[name="csrf-token"]')?.getAttribute('content') || ''

  const accessToken = localStorage.getItem('access-token')
  const uid = localStorage.getItem('uid')
  const client = localStorage.getItem('client')

  console.log('Access Token:', accessToken) // デバッグ用
  console.log('UID:', uid) // デバッグ用
  console.log('Client:', client) // デバッグ用

  if (!accessToken || !uid || !client) {
    console.log('Missing one or more authentication tokens in localStorage!')
  } else {
    console.log('Using access-token, uid, and client from localStorage')
  }

  return {
    'X-CSRF-Token': csrfToken,
    'access-token': accessToken || '',
    uid: uid || '',
    client: client || '',
  }
}

// WebSocket接続作成
const createConsumerInstance = (): ReturnType<typeof createConsumer> => {
  return createConsumer(wsUrl) // Only pass the WebSocket URL here
}

export const subscribeToChat = (
  roomId: string | number,
  onReceivedMessage: (message: string) => void,
): Subscription => {
  const cable = createConsumerInstance()

  const subscription = cable.subscriptions.create(
    { channel: 'ChatChannel', room_id: roomId },
    {
      headers: getAuthHeaders(), // ここでヘッダーが送信されているか確認
      received(data: { message: string }) {
        onReceivedMessage(data.message)
      },
      connected() {
        console.log('Connected to chat channel!')
      },
      disconnected() {
        console.log('Disconnected from chat channel!')
      },
    },
  )

  console.log('subscription:', subscription)

  return subscription
}

export const sendMessage = (roomId: string | number, message: string): void => {
  const cable = createConsumerInstance()

  const subscription = cable.subscriptions.create(
    { channel: 'ChatChannel', room_id: roomId },
    {
      sendMessage() {
        this.send({ room_id: roomId, message: message }) // Send the message
      },
    },
  )

  subscription.sendMessage() // Actually send the message
}
