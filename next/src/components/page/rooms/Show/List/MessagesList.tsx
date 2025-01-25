import { MessageProps, MessagesListProps } from '@/types/Room/Show/List'

export const MessagesList = ({ messages, user }: MessagesListProps) => (
  <div className="flex grow items-center justify-center border-slate-500 bg-slate-200 p-4 ">
    <div className="w-full max-w-2xl space-y-4">
      {messages.map((message: MessageProps, i: number) =>
        message.user_id === user.id ? (
          <div key={i} className="flex justify-end">
            <div className="rounded-lg bg-green-200 p-3 shadow-md">
              <div>{message.content}</div> {/* メッセージの内容を表示 */}
            </div>
          </div>
        ) : (
          <div key={i} className="flex justify-start">
            <div className=" rounded-lg bg-white p-3 shadow-md">
              <div>{message.content}</div> {/* メッセージの内容を表示 */}
            </div>
          </div>
        ),
      )}
    </div>
  </div>
)
