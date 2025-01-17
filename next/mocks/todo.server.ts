import { http, HttpResponse } from 'msw' // msw の HTTP モック用
import { setupServer } from 'msw/node'
// http を使ってリクエストをモック
const handlers = [
  http.get('http://localhost:3000/api/v1/current/todos', () => {
    console.log('Intercepting API request for todos...')
    return HttpResponse.json({
      todos: [
        { id: 1, title: 'タイトル1', subject: '英語' },
        { id: 2, title: 'タイトル2', subject: '現代文' },
      ],
      meta: { total_pages: 1, current_page: 1 },
    })
  }),
]

// サーバーの設定
const server = setupServer(...handlers)

// Jest ライフサイクルを使ってサーバーを管理
beforeAll(() => server.listen()) // サーバーを起動
afterEach(() => server.resetHandlers()) // 各テスト後にハンドラーをリセット
afterAll(() => server.close()) // テスト後にサーバーを停止

export { server, handlers }
