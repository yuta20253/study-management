import { render, screen } from '@testing-library/react'
import FacultyDetails from '../../../src/pages/current/schools/[school_id]/details/[id]'
import { DataState } from '@/hooks/schools/details/DataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import '@testing-library/jest-dom'

// Mock necessary hooks
jest.mock('@/hooks/useRequireSignIn', () => ({
  useRequireSignedIn: jest.fn(),
}))

jest.mock('@/hooks/schools/details/DataState', () => ({
  DataState: jest.fn(),
}))

describe('FacultyDetails', () => {
  it('試験科目が正しく表示されること', async () => {
    const mockFacultyData = {
      faculty_data: {
        first_exam_subjects: [{ english: '80', math: '70' }],
        second_exam_subjects: [
          { practical_skills: '合格', comprehensive_question: '合格' },
        ],
      },
    }
    ;(useRequireSignedIn as jest.Mock).mockReturnValue(true)
    ;(DataState as jest.Mock).mockReturnValue({
      facultyData: mockFacultyData,
      school_id: 1,
      id: 2,
    })

    render(<FacultyDetails />)

    // "英語"と"数学"というテキストを全て取得
    const subjects = screen.getAllByText(/英語|数学/)

    expect(subjects).toHaveLength(5) // "英語"と"数学"が両方とも表示されていることを確認
    expect(subjects[0]).toHaveTextContent('英語') // 最初の科目が「英語」であることを確認
    expect(subjects[1]).toHaveTextContent('数学') // 2番目の科目が「数学」であることを確認
  })

  it('学部データがない場合、詳細が表示されないこと', () => {
    ;(useRequireSignedIn as jest.Mock).mockReturnValue(true)
    ;(DataState as jest.Mock).mockReturnValue({
      facultyData: null,
      school_id: 1,
      id: 2,
    })

    render(<FacultyDetails />)

    // 学部データがない場合、"地域区分"のテキストは表示されないはず
    expect(screen.queryByText('地域区分')).toBeNull()
  })
})
