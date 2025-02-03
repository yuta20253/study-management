import { University } from '@/types/DesiredSchool'
export const universityLength = (
  count: number,
  jsonUniversity: University[][],
): number => {
  jsonUniversity.map((uni) => {
    count = Object.keys(uni).length
  })
  return count
}
