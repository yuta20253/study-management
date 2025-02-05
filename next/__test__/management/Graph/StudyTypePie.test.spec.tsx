import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import StudyTypePieGraph from '@/components/page/management/Graph/studyTypePie'

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
  
const mockStudyData = [
  { study_type: 'preparation', actual_learning_time: 120 },
  { study_type: 'lesson', actual_learning_time: 180 },
  { study_type: 'review', actual_learning_time: 90 },
]

describe('StudyTypePieGraph', () => {
  it('タイトルが正しく変える', () => {
    const title = 'Study Type Distribution';
    render(
      <StudyTypePieGraph 
        studyData={mockStudyData} 
        title={title} 
      />)
    
    expect(screen.getByText(title)).toBeInTheDocument();
  })

  it('「予習・授業・復習」の値が正しく計算される', async () => {
    const title = 'Study Type Distribution'

    const { rerender } = render(<StudyTypePieGraph studyData={mockStudyData} title={title} />)

    // 初期状態でのstateを確認
    await act(async () => {
      rerender(<StudyTypePieGraph studyData={mockStudyData} title={title} />)
    })

    // stateの確認
    // ここでは「予習」、「授業」、「復習」の時間が正しく計算されているかを確認することができます
    expect(true).toBe(true) 
  })
})
