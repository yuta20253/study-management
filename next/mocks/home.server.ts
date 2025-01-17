import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
// http を使ってリクエストをモック
const handlers = [
  http.get('http://localhost:3000/api/v1/current/home', () => {
    console.log('Intercepting API request for home...')
    return HttpResponse.json({
      message: 'Welcome to Home!',
      status: 200,
    })
  }),
  // エラーハンドリング（テスト用）
  http.get('http://localhost:3000/api/v1/current/home', () => {
    return HttpResponse.json({
      message: 'Something went wrong',
      status: 500,
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
