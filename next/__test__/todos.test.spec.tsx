import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { DataState } from '../src/hooks/todos/useDataState'
import { useUserState } from '../src/hooks/useGlobalState' 
import Todos from '../src/pages/current/todos' 

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../src/hooks/useGlobalState', () => ({
  useUserState: jest.fn(),
}))

jest.mock('../src/hooks/todos/DataState', () => ({
  DataState: jest.fn().mockReturnValue({
    todos: [
      { id: 1, title: 'Todo 1', status: 'incomplete' },
      { id: 2, title: 'Todo 2', status: 'complete' },
    ],
    setTodos: jest.fn(),
    todoDetail: undefined,
    setTodoDetail: jest.fn(),
    deleteId: undefined,
    setDeleteId: jest.fn(),
    isOpen: false,
    onOpen: jest.fn(),
    onClose: jest.fn(),
    status: '',
    isDelete: false,
    setIsDelete: jest.fn(),
    meta: { total_pages: 1, current_page: 1 },
    handleChangePage: jest.fn(),
    handleChangeStatusAll: jest.fn(),
    handleChangeStatusIncomplete: jest.fn(),
    handleChangeStatusComplete: jest.fn(),
    handleChangeStatusOnTheWay: jest.fn(),
    errorMessage: null,
  }),
}))

describe('DataState Component', () => {
  it('クエリパラメータを正しく読み取り、ページを適切に処理', () => {
    const push = jest.fn()

    ;(useRouter as jest.Mock).mockReturnValue({
      query: { page: '2' }, 
      push, 
    })

    ;(useUserState as jest.Mock).mockReturnValue([
      { isFetched: true, isSignedIn: true },
    ])

    render(<Todos />)

    expect(push).not.toHaveBeenCalled()
  })
})

describe('Todo List Rendering', () => {
  it('正しい数のTodoをレンダリング', () => {
    render(<Todos />)

    expect(screen.getByText('Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Todo 2')).toBeInTheDocument()
  })
})

describe('Create New Todo Modal', () => {
  it('「新規追加」ボタンがクリックされたとき、モーダルを開く', () => {
    const mockOnOpen = jest.fn()

    ;(useUserState as jest.Mock).mockReturnValue([
      { isFetched: true, isSignedIn: true },
    ])

    ;(DataState as jest.Mock).mockReturnValue({
      todos: [
        { id: 1, title: 'Todo 1', status: 'incomplete' },
        { id: 2, title: 'Todo 2', status: 'complete' },
      ],
      setTodos: jest.fn(),
      todoDetail: undefined,
      setTodoDetail: jest.fn(),
      deleteId: undefined,
      setDeleteId: jest.fn(),
      isOpen: false,
      onOpen: mockOnOpen, 
      onClose: jest.fn(),
      status: '',
      isDelete: false,
      setIsDelete: jest.fn(),
      meta: { total_pages: 1, current_page: 1 },
      handleChangePage: jest.fn(),
      handleChangeStatusAll: jest.fn(),
      handleChangeStatusIncomplete: jest.fn(),
      handleChangeStatusComplete: jest.fn(),
      handleChangeStatusOnTheWay: jest.fn(),
      errorMessage: null,
    })

    render(<Todos />)

    const addButton = screen.getByText('新規追加')
    fireEvent.click(addButton)

    expect(mockOnOpen).toHaveBeenCalled()
  })
})

describe('Pagination', () => {
  it('paginationがクリックされたら、ページが変わる', () => {
    const mockHandleChangePage = jest.fn()

    ;(DataState as jest.Mock).mockReturnValue({
      todos: [
        { id: 1, title: 'Todo 1', status: 'incomplete' },
        { id: 2, title: 'Todo 2', status: 'complete' },
      ],
      setTodos: jest.fn(),
      todoDetail: undefined,
      setTodoDetail: jest.fn(),
      deleteId: undefined,
      setDeleteId: jest.fn(),
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
      status: '',
      isDelete: false,
      setIsDelete: jest.fn(),
      meta: { total_pages: 3, current_page: 1 },
      handleChangePage: mockHandleChangePage,
      handleChangeStatusAll: jest.fn(),
      handleChangeStatusIncomplete: jest.fn(),
      handleChangeStatusComplete: jest.fn(),
      handleChangeStatusOnTheWay: jest.fn(),
      errorMessage: null,
    })

    render(<Todos />)

    const nextPageButton = screen.getByLabelText('Go to next page') 
    fireEvent.click(nextPageButton)

    expect(mockHandleChangePage).toHaveBeenCalledWith(expect.anything(), 2)
  })
})

describe('Todo Status Change', () => {
  it('Allが選ばれた時、handleChangeStatusAllが呼ばれる', () => {
    const mockHandleChangeStatusAll = jest.fn()

    ;(DataState as jest.Mock).mockReturnValue({
      todos: [
        { id: 1, title: 'Todo 1', status: 'incomplete' },
        { id: 2, title: 'Todo 2', status: 'complete' },
      ],
      setTodos: jest.fn(),
      todoDetail: undefined,
      setTodoDetail: jest.fn(),
      deleteId: undefined,
      setDeleteId: jest.fn(),
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
      status: '',
      isDelete: false,
      setIsDelete: jest.fn(),
      meta: { total_pages: 1, current_page: 1 },
      handleChangePage: jest.fn(),
      handleChangeStatusAll: mockHandleChangeStatusAll,
      handleChangeStatusIncomplete: jest.fn(),
      handleChangeStatusComplete: jest.fn(),
      handleChangeStatusOnTheWay: jest.fn(),
      errorMessage: null,
    })

    render(<Todos />)

    const allButton = screen.getByText('全て')
    fireEvent.click(allButton)

    expect(mockHandleChangeStatusAll).toHaveBeenCalled()
  })

  it('Incompliteが選ばれた時、handleChangeStatusIncompleteが呼ばれる', () => {
    const mockHandleChangeStatusIncomplete = jest.fn()

    ;(DataState as jest.Mock).mockReturnValue({
      todos: [
        { id: 1, title: 'Todo 1', status: 'incomplete' },
        { id: 2, title: 'Todo 2', status: 'complete' },
      ],
      setTodos: jest.fn(),
      todoDetail: undefined,
      setTodoDetail: jest.fn(),
      deleteId: undefined,
      setDeleteId: jest.fn(),
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
      status: '',
      isDelete: false,
      setIsDelete: jest.fn(),
      meta: { total_pages: 1, current_page: 1 },
      handleChangePage: jest.fn(),
      handleChangeStatusAll: jest.fn(),
      handleChangeStatusIncomplete: mockHandleChangeStatusIncomplete,
      handleChangeStatusComplete: jest.fn(),
      handleChangeStatusOnTheWay: jest.fn(),
      errorMessage: null,
    })

    render(<Todos />)

    const incompleteButton = screen.getByText('未完了')
    fireEvent.click(incompleteButton)

    expect(mockHandleChangeStatusIncomplete).toHaveBeenCalled()
  })

  it('フィルターボタンがクリックされたときに、ステータスでTodoをフィルタリングされる', () => {
    const mockHandleChangeStatusIncomplete = jest.fn()

    ;(DataState as jest.Mock).mockReturnValue({
      todos: [
        { id: 1, title: 'Todo 1', status: 'incomplete' },
        { id: 2, title: 'Todo 2', status: 'complete' },
      ],
      setTodos: jest.fn(),
      todoDetail: undefined,
      setTodoDetail: jest.fn(),
      deleteId: undefined,
      setDeleteId: jest.fn(),
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
      status: '',
      isDelete: false,
      setIsDelete: jest.fn(),
      meta: { total_pages: 1, current_page: 1 },
      handleChangePage: jest.fn(),
      handleChangeStatusAll: jest.fn(),
      handleChangeStatusIncomplete: mockHandleChangeStatusIncomplete,
      handleChangeStatusComplete: jest.fn(),
      handleChangeStatusOnTheWay: jest.fn(),
      errorMessage: null,
    })

    render(<Todos />)

    fireEvent.click(screen.getByText('未完了'))

    expect(mockHandleChangeStatusIncomplete).toHaveBeenCalled()
  })
})
