import StudyPieGraph from '@/components/page/management/Graph/studyPie'
import { render, screen } from '@testing-library/react'

  jest.mock('react-chartjs-2', () => ({
    Pie: jest.fn(({ options, onClick }) => {
      return (
        <div>
          <div onClick={(e) => onClick(e, [{ index: 0 }])}>
            {options?.plugins?.title?.text}
          </div>
        </div>
      )
    }),
  }))

describe('StudyPieGraph Component', () => {
  const mockSetSecondModalOpen = jest.fn()
  const mockSetForModalSubject = jest.fn()

  const mockStudyData = [
    { 
      subject: '英語', 
      actual_learning_time: 120, 
      title: '英語学習',  
      study_type: 'self-study',  
      created_at: new Date('2025-02-05T10:00:00Z'), 
    },
    { 
      subject: '現代文', 
      actual_learning_time: 100, 
      title: '現代文学習',  
      study_type: 'classwork',  
      created_at: new Date('2025-02-05T10:00:00Z'), 
    },
    { 
      subject: '数学', 
      actual_learning_time: 80, 
      title: '数学学習',  
      study_type: 'self-study',  
      created_at: new Date('2025-02-05T10:00:00Z'), 
    },
  ]

  const mockTitle = 'モックタイトル'

  it('正しいタイトルでレンダリング', () => {
    render(
      <StudyPieGraph
        studyData={mockStudyData}
        title={mockTitle}
        secondModalOpen={false}
        setSecondModalOpen={mockSetSecondModalOpen}
        setForModalSubject={mockSetForModalSubject}
      />
    )

    // チャートタイトルが正しくレンダリングされている
    expect(screen.getByText(mockTitle)).toBeInTheDocument()

    // モックされたPie チャートがレンダリングされている
    expect(screen.getByText('モックタイトル')).toBeInTheDocument()
  })
})
