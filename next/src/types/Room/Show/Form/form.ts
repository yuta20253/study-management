export type MessageInputProps = {
  messageContent: string
  setMessageContent: (content: string) => void
  sendMessage: (e: React.FormEvent) => void
}
