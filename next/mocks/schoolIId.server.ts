import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/schools/123`,
    () => {
      return HttpResponse.json({
        uni: {
          school: 'Mock University',
          data: [
            { faculty: 'Faculty 1' },
            { faculty: 'Faculty 2' },
            { faculty: 'Faculty 3' },
          ],
        },
      })
    },
  ),
]

const server = setupServer(...handlers)

// Jest ライフサイクルを使ってサーバーを管理
beforeAll(() => server.listen()) // サーバーを起動
afterEach(() => server.resetHandlers()) // 各テスト後にハンドラーをリセット
afterAll(() => server.close()) // テスト後にサーバーを停止

export { server, handlers }
