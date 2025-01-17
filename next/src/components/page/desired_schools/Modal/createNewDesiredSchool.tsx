import axios, { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ClickProps, University } from '@/types/DesiredSchool/Modal/DesiredSchoolModalType'

export const CreateNewDesiredSchoolModal = ({
  universityName,
  jsonUniversity,
  onClose,
}: ClickProps) => {
  const router = useRouter()
  const [facultyCode, setFacultyCode] = useState<number>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const uniName = universityName + '大学'
  let selectUniversity: University | undefined

  jsonUniversity.map((universityArray) => {
    universityArray.map((uni) => {
      if (uni['uni']['school'] === uniName) {
        selectUniversity = uni
      }
    })
  })

  const searchFaculty = (facCode: number) => {
    let searchFaculty
    selectUniversity?.uni.data.map((university) => {
      if (university.faculty_of_code === facCode) {
        searchFaculty = university
        return
      }
      return
    })
    return searchFaculty
  }

  const handleClick = (num: number) => {
    setFacultyCode(num)
    const postData = searchFaculty(num)

    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/desired_schools'

    const header = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    const data = postData

    axios({
      method: 'POST',
      url: url,
      headers: header,
      data: data,
    })
      .then((res: AxiosResponse) => {
        console.log(res.status)
        router.push('/current/desired_schools')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        if (e.response?.data?.error) {
          setErrorMessage(e.response.data.error)
        } else {
          setErrorMessage('予期しないエラーが発生しました')
        }
        console.log(e.message)
      })
  }

  const handleCloseError = () => {
    setErrorMessage(null)
  }

  return (
    <div className="absolute top-20 z-20 mt-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="m-2 flex w-full max-w-4xl items-center justify-center rounded-lg shadow-lg p-4 bg-white">
        <div className="w-full">
          {errorMessage && (
            <div className="my-2 text-center text-red-500">
              {errorMessage}
              <button
                className="ml-2 rounded bg-sky-500 p-1 text-sm text-white"
                onClick={handleCloseError}
                type="button"
              >
                閉じる
              </button>
            </div>
          )}
          <table className="w-full table-auto bg-cyan-100 border-separate border-spacing-1">
            <thead className="bg-sky-700">
              <tr>
                <th className="text-white text-sm sm:text-base px-4 py-2">大学名</th>
                <th className="text-white text-sm sm:text-base px-4 py-2">学部名</th>
                <th className="text-white text-sm sm:text-base px-4 py-2">学科名</th>
                <th className="text-white text-sm sm:text-base px-4 py-2">学部コード</th>
                <th className="text-white text-sm sm:text-base px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {selectUniversity?.uni.data.map((d, i: number) => (
                <tr key={i} className="border-t">
                  <td className="text-center text-sm sm:text-base py-2 px-4">{d.university}</td>
                  <td className="text-center text-sm sm:text-base py-2 px-4">{d.faculty}</td>
                  <td className="text-center text-sm sm:text-base py-2 px-4">{d.department}</td>
                  <td className="text-center text-sm sm:text-base py-2 px-4">{d.faculty_of_code}</td>
                  <td className="text-center py-2 px-4">
                    <button
                      type="button"
                      className="rounded bg-sky-500 px-4 py-2 text-white text-sm sm:text-base"
                      onClick={() => handleClick(d.faculty_of_code)}
                    >
                      登録
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 text-right">
        <button
          onClick={onClose}
          className="rounded bg-sky-500 px-4 py-2 text-white text-sm sm:text-base"
        >
          閉じる
        </button>
      </div>
    </div>
  )
}
