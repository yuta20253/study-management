import { render, screen, waitFor } from '@testing-library/react'
import { useUserState } from '@/hooks/useGlobalState'
import { StudyHoursProps } from '@/types/Management/Graph/StudyComparisonWithPeopleBar'
import StudyComparisonWithPeopleBar from '@/components/page/management/Graph/studyComparisonＷithPeopleBar'


jest.mock('@/hooks/useGlobalState', () => ({
  useUserState: jest.fn(),
}))

describe('StudyComparisonWithPeopleBar', () => {
  const mockStudyData: StudyHoursProps[] = [
    {
        todo: {
            user_id: 1,
            id: 0,
            title: '',
            progress: ''
        },
        study_type: 'preparation',
        actual_learning_time: 50,
        title: 'Study 1',
        subject: '数学',
        created_at: new Date('2025-01-01'),
        todo_id: 0
    },
    {
        todo: {
            user_id: 2,
            id: 0,
            title: '',
            progress: ''
        },
        study_type: 'lesson',
        actual_learning_time: 30,
        title: 'Study 2',
        subject: '英語',
        created_at: new Date('2025-01-02'),
        todo_id: 0
    },
    {
        todo: {
            user_id: 1,
            id: 0,
            title: '',
            progress: ''
        },
        study_type: 'review',
        actual_learning_time: 20,
        title: 'Study 3',
        subject: '化学',
        created_at: new Date('2025-01-03'),
        todo_id: 0
    },
    {
        todo: {
            user_id: 2,
            id: 0,
            title: '',
            progress: ''
        },
        study_type: 'preparation',
        actual_learning_time: 60,
        title: 'Study 4',
        subject: '数学',
        created_at: new Date('2025-01-04'),
        todo_id: 0
    },
    {
        todo: {
            user_id: 1,
            id: 0,
            title: '',
            progress: ''
        },
        study_type: 'lesson',
        actual_learning_time: 40,
        title: 'Study 5',
        subject: '英語',
        created_at: new Date('2025-01-05'),
        todo_id: 0
    },
    {
        todo: {
            user_id: 2,
            id: 0,
            title: '',
            progress: ''
        },
        study_type: 'review',
        actual_learning_time: 25,
        title: 'Study 6',
        subject: '化学',
        created_at: new Date('2025-01-06'),
        todo_id: 0
    },
  ]

  const mockFollowers = 2

  beforeEach(() => {
    ;(useUserState as jest.Mock).mockReturnValue([{ id: 'user1' }])
  })

  it('正しいデータのchatがrenderされる', async () => {
    render(
      <StudyComparisonWithPeopleBar
        studyData={mockStudyData}
        title="モックタイトル"
        followers={mockFollowers}
      />
    )
  
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument()
    })
  
    const canvas = screen.getByRole('img')
    expect(canvas).toHaveAttribute('aria-label', 'Study Comparison')
  })

  it('study dataの変更に基づいてデータを更新', async () => {
    const updatedStudyData: StudyHoursProps[] = [
      {
        todo: { user_id: 1, id: 0, title: '', progress: '' },
        study_type: 'preparation',
        actual_learning_time: 80,
        title: 'Study 1',
        subject: '数学',
        created_at: new Date('2025-01-01'),
        todo_id: 0,
      },
      ...mockStudyData.slice(1), 
    ]
  
    render(
      <StudyComparisonWithPeopleBar
        studyData={updatedStudyData}
        title="更新モックタイトル"
        followers={mockFollowers}
      />
    )
  
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument()
    })
  })
  
})
