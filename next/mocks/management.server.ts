import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
  http.get('http://localhost:3000/api/v1/current/management', () => {
    console.log('Intercepting API request for management...')
    return HttpResponse.json({
      study_hours: [
        {
          title: '英語の勉強',
          todo_id: 1,
          created_at: '2024-01-01T00:00:00Z',
        },
        {
          title: '数学の復習',
          todo_id: 2,
          created_at: '2024-01-02T00:00:00Z',
        },
      ],
      all_study_hours: [
        {
          title: '全体的な勉強時間',
          todo_id: 3,
          created_at: '2024-01-03T00:00:00Z',
        },
      ],
    })
  }),
]

const server = setupServer(...handlers)

// Jest ライフサイクルを使ってサーバーを管理
beforeAll(() => server.listen()) // サーバーを起動
afterEach(() => server.resetHandlers()) // 各テスト後にハンドラーをリセット
afterAll(() => server.close()) // テスト後にサーバーを停止

export { server, handlers }
