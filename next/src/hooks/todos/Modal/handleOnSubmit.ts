import axios, { AxiosError } from 'axios'
import { TodoProps } from '@/types/Todo/createNewTodo/newTodo'
export const onSubmitHandler = async (data: TodoProps, dueDate: string) => {
  console.log(data)
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/todos'
  const header = {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  }

  const postStudyType =
    data.study_type === '予習'
      ? 'preparation'
      : data.study_type === '授業'
        ? 'lesson'
        : 'review'

  const postData = {
    ...data,
    study_type: postStudyType,
    due_date: dueDate,
  }

  try {
    const response = await axios({
      method: 'POST',
      url: url,
      headers: header,
      data: postData,
    })
    console.log('Todoを追加しました', response.data)
    window.location.reload()
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response) {
      alert('エラーが発生しました。もう一度お試しください。')
    } else if (axiosError.request) {
      alert('ネットワークエラーです。確認してください。')
    } else {
      alert('予期しないエラーが発生しました。')
    }
  }
}
