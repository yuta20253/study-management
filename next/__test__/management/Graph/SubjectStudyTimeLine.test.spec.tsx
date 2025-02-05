import { render, screen } from '@testing-library/react'
import SubjectStudyTimeLine from '@/components/page/management/Graph/subjectStudyTimeLine'

jest.mock('@/utils/formatDate', () => ({
  formatDate: jest.fn(() => '2025-02-05'),
}))

describe('SubjectStudyTimeLine', () => {
  const mockStudyData = [
    {
      subject: '数学',
      created_at: new Date('2025-02-05T00:00:00Z'),
      actual_learning_time: 2,
      title: '数学学習', 
      study_type: 'preparation', 
    },
    {
      subject: '数学',
      created_at: new Date('2025-02-05T01:00:00Z'),
      actual_learning_time: 3,
      title: '数学学習',
      study_type: 'lesson',  
    },
    {
      subject: '化学',
      created_at: new Date('2025-02-06T00:00:00Z'),
      actual_learning_time: 1,
      title: '化学学習',
      study_type: 'review', 
    },
  ]

  const mockSentLabels = ['数学', '化学', '日本史']
  it('subjectNameが空の場合、「科目を選択してください」が表示される', () => {
    render(
      <SubjectStudyTimeLine
        studyData={mockStudyData}
        title="Study Time Overview"
        subjectName=""
        sentlabels={mockSentLabels}
      />
    )

    expect(screen.getByText(/科目を選択してください/i)).toBeInTheDocument()
  })
})
