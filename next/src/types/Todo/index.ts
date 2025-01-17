import { Dispatch, SetStateAction } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'

export type TodoProps = {
  id: number
  subject: string
  title: string
  description: string
  progress: string
  study_type: string
  scheduled_study_time: number
  total_hour: number
  due_date: Date
  importance: number
  star_rating: number
  study_hours: {
    id: number
    title: string
    study_type: string
    actual_learning_time: number
    created_at: Date
    updated_at: Date
  }
}

export type EditTodoProps = {
  id: number
  subject: string
  title: string
  description: string
  progress: string
  study_type: string
  scheduled_study_time: number
  total_hour: number
  due_date: Date
  importance: number
  star_rating: number
  study_hours: {
    id: number
    title: string
    study_type: string
    actual_learning_time: number
    created_at: Date
    updated_at: Date
  }
}

export type FieldErrorsEditTodoProps = FieldErrors<EditTodoProps> & {
  message: {
    study_hours: {
      title?: FieldError
      actual_learning_time?: FieldError
    }
  }
}

export type Meta = {
  current_page: number
  total_pages: number
}

export type PageProps = {
  propsSize: number //ページ数を計算するために必要な全ユーザーの数
  setCurrentPageNumber: (page: number) => void //ページネーションの番号をセットする関数
}

export type Todos = {
  todos: TodoProps[] | undefined
  status: string
}

export type Todo = {
  todo: TodoProps
  //id: string | string[]
}

export type TodoDetailProps = {
  todo: TodoProps
  setTodoDetail?: Dispatch<SetStateAction<TodoProps | undefined>>
}
