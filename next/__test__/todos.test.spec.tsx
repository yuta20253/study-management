import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { DataState } from '../src/hooks/todos/DataState'
import { useUserState } from '../src/hooks/useGlobalState' // Adjust the path as needed
import Todos from '../src/pages/current/todos' // Adjust the path as needed

// Mocking next/router and useUserState correctly
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../src/hooks/useGlobalState', () => ({
  useUserState: jest.fn(),
}))

jest.mock('../src/hooks/ui/todos/DataState', () => ({
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
  it('should correctly read query parameters and handle page', () => {
    const push = jest.fn()

    // Mock useRouter to simulate the query object
    ;(useRouter as jest.Mock).mockReturnValue({
      query: { page: '2' }, // Mock router.query with a page parameter
      push, // Mock push for redirection calls
    })

    // Mock useUserState to simulate a signed-in user
    ;(useUserState as jest.Mock).mockReturnValue([
      { isFetched: true, isSignedIn: true }, // Simulate user state as signed in
    ])

    // Render the Todos page (or the relevant component)
    render(<Todos />)

    // Ensure that router.query.page is correctly processed as 2
    expect(push).not.toHaveBeenCalled() // If page handling works, push should not be called
  })
})

describe('Todo List Rendering', () => {
  it('should render the correct number of todos', () => {
    render(<Todos />)

    // Ensure the todos are rendered
    expect(screen.getByText('Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Todo 2')).toBeInTheDocument()
  })
})

describe('Create New Todo Modal', () => {
  it('should open the modal when "新規追加(Open Modal)" button is clicked', () => {
    const mockOnOpen = jest.fn()

    // Mock useUserState to simulate a signed-in user
    ;(useUserState as jest.Mock).mockReturnValue([
      { isFetched: true, isSignedIn: true },
    ])

    // Mock DataState to return mock values, passing the mock `onOpen`
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
      onOpen: mockOnOpen, // Ensure `mockOnOpen` is passed here
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

    // Find the button and simulate the click event
    const addButton = screen.getByText('新規追加(Open Modal)')
    fireEvent.click(addButton)

    // Ensure the modal open function was called
    expect(mockOnOpen).toHaveBeenCalled()
  })
})

describe('Pagination', () => {
  it('should change page when pagination is clicked', () => {
    const mockHandleChangePage = jest.fn()

    // Mock DataState to pass the mock function for handleChangePage
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

    // Find the pagination and simulate a click on the next page button
    const nextPageButton = screen.getByLabelText('Go to next page') // Ensure the correct aria-label is used
    fireEvent.click(nextPageButton)

    // Ensure handleChangePage was called with the expected page number
    expect(mockHandleChangePage).toHaveBeenCalledWith(expect.anything(), 2)
  })
})

describe('Todo Status Change', () => {
  it('should call handleChangeStatusAll when "All" is selected', () => {
    const mockHandleChangeStatusAll = jest.fn()

    // Mock DataState with the mock function for handleChangeStatusAll
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

    // Simulate clicking the "All" status filter button
    const allButton = screen.getByText('全て')
    fireEvent.click(allButton)

    // Verify that the handleChangeStatusAll function was called
    expect(mockHandleChangeStatusAll).toHaveBeenCalled()
  })

  it('should call handleChangeStatusIncomplete when "Incomplete" is selected', () => {
    const mockHandleChangeStatusIncomplete = jest.fn()

    // Mock DataState with the mock function for handleChangeStatusIncomplete
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

    // Simulate clicking the "Incomplete" status filter button
    const incompleteButton = screen.getByText('未完了')
    fireEvent.click(incompleteButton)

    // Verify that the handleChangeStatusIncomplete function was called
    expect(mockHandleChangeStatusIncomplete).toHaveBeenCalled()
  })

  it('should filter todos by status when filter buttons are clicked', () => {
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

    // Simulate clicking on the "Incomplete" filter
    fireEvent.click(screen.getByText('未完了'))

    // Verify that the appropriate status change function was called
    expect(mockHandleChangeStatusIncomplete).toHaveBeenCalled()
  })
})
