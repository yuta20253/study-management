import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'
import Management from '../src/pages/current/management'
import { DataState } from '@/hooks/management/DataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

// Mock necessary modules
jest.mock('@/hooks/useRequireSignIn')
jest.mock('@/hooks/management/DataState', () => ({
  DataState: jest.fn(),
}))

// Ensure correct mocking for `useRouter` from next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Management Component', () => {
  const defaultDataState = {
    isOpen: false,
    onOpen: jest.fn(),
    onClose: jest.fn(),
    user: { followers: [] },
    studyHours: [{ subject: 'Math', hours: 10 }],
    allStudyHours: [{ subject: 'Math', hours: 15 }],
    selectedSubject: 'Math',
    displiedPeriod: '2024-01',
    selectedPeriod: '2024-01',
    studyType: 'focus',
    title: 'Study History',
    todoId: 1,
    subjectName: 'Math',
    selectSubjectProps: [{ subject: 'Math', time: 10 }],
    sentlabels: [],
    graph: '学習タイプ別割合',
    secondModalOpen: false,
    setSecondModalOpen: jest.fn(),
    forModalSubject: 'Math',
    setForModalSubject: jest.fn(),
    handleSelectSubject: jest.fn(),
    handleCreatePeriod: jest.fn(),
    handleChangeDisplayPeriod: jest.fn(),
    handleChangeStudyType: jest.fn(),
    handleClickStudy: jest.fn(),
    handleSelectSubjectName: jest.fn(),
    handleSelectGraph: jest.fn(),
  }

  beforeEach(() => {
    // Mock `useRequireSignedIn` to return true
    ;(useRequireSignedIn as jest.Mock).mockReturnValue(true)

    // Mock DataState to return the defaultDataState
    ;(DataState as jest.Mock).mockReturnValue(defaultDataState)

    // Mock `useRouter` to return a custom router object
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: {},
      pathname: '/',
      asPath: '/',
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    })
  })

  it('should call handleSelectGraph when a graph is selected', async () => {
    const handleSelectGraphMock = jest.fn()
    ;(DataState as jest.Mock).mockReturnValueOnce({
      ...defaultDataState,
      handleSelectGraph: handleSelectGraphMock,
    })

    render(<Management />)

    // Simulate changing the selected graph
    const selectElement = screen.getByLabelText(/表示グラフ変更/i)
    fireEvent.change(selectElement, { target: { value: '学習タイプ別割合' } })

    // Ensure that the handler was called with the correct argument
    expect(handleSelectGraphMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '学習タイプ別割合' }),
      }),
    )
  })

  it('should call handleSelectSubject when a subject is selected', async () => {
    // Create a mock function to track calls to handleSelectSubject
    const handleSelectSubjectMock = jest.fn()

    // Override DataState to return the mock handler for handleSelectSubject
    ;(DataState as jest.Mock).mockReturnValueOnce({
      ...defaultDataState,
      handleSelectSubject: handleSelectSubjectMock,
    })

    render(<Management />)

    // Simulate selecting a subject from the dropdown
    const selectElement = screen.getByLabelText(/科目変更/i)

    // Trigger a change event with the correct value
    fireEvent.change(selectElement, { target: { value: '英語' } })

    // Ensure that handleSelectSubject was called with the event object
    expect(handleSelectSubjectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '英語' }),
      }),
    )
  })
})
