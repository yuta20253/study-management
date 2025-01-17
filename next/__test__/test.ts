// types/Todo/test.ts

export interface Todo {
  id: number
  title: string
  subject: string
  progress?: string // progressが任意フィールドなら `?` を追加
}

export interface TodosResponse {
  todos: Todo[]
  meta: {
    total_pages: number
    current_page: number
  }
}
