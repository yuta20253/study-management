import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'
import Management from '../src/pages/current/management'
import { useDataState } from '@/hooks/management/useDataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

jest.mock('@/hooks/useRequireSignIn')
jest.mock('@/hooks/management/useDataState', () => ({
  useDataState: jest.fn(),
}))

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
    ;(useRequireSignedIn as jest.Mock).mockReturnValue(true)

    ;(useDataState as jest.Mock).mockReturnValue(defaultDataState)

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

  it('graphが選ばれた時、handleSelectGraphが呼ばれる', async () => {
    const handleSelectGraphMock = jest.fn()
    ;(useDataState as jest.Mock).mockReturnValueOnce({
      ...defaultDataState,
      handleSelectGraph: handleSelectGraphMock,
    })

    render(<Management />)

    const selectElement = screen.getByLabelText(/表示グラフ変更/i)
    fireEvent.change(selectElement, { target: { value: '学習タイプ別割合' } })

    expect(handleSelectGraphMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '学習タイプ別割合' }),
      }),
    )
  })

  it('科目が選ばれた時、handleSelectSubjectが呼ばれる', async () => {
    const handleSelectSubjectMock = jest.fn()

    ;(useDataState as jest.Mock).mockReturnValueOnce({
      ...defaultDataState,
      handleSelectSubject: handleSelectSubjectMock,
    })

    render(<Management />)

    const selectElement = screen.getByLabelText(/科目変更/i)

    fireEvent.change(selectElement, { target: { value: '英語' } })

    expect(handleSelectSubjectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '英語' }),
      }),
    )
  })
})
