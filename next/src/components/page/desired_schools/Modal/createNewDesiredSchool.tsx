import axios, { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  ClickProps,
  University,
} from '@/types/DesiredSchool/Modal/DesiredSchoolModalType'

export const CreateNewDesiredSchoolModal = ({
  universityName,
  jsonUniversity,
  onClose,
}: ClickProps) => {
  const router = useRouter()
  const [, setFacultyCode] = useState<number>()
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

    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/current/desired_schools'

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
    <div className="absolute top-20 z-20 mx-auto mt-10 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="m-2 flex w-full max-w-4xl items-center justify-center rounded-lg bg-white p-4 shadow-lg">
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
          <table className="w-full table-auto border-separate border-spacing-1 bg-cyan-100">
            <thead className="bg-sky-700">
              <tr>
                <th className="px-4 py-2 text-sm text-white sm:text-base">
                  大学名
                </th>
                <th className="px-4 py-2 text-sm text-white sm:text-base">
                  学部名
                </th>
                <th className="px-4 py-2 text-sm text-white sm:text-base">
                  学科名
                </th>
                <th className="px-4 py-2 text-sm text-white sm:text-base">
                  学部コード
                </th>
                <th className="px-4 py-2 text-sm text-white sm:text-base"></th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {selectUniversity?.uni.data.map((d, i: number) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2 text-center text-sm sm:text-base">
                    {d.university}
                  </td>
                  <td className="px-4 py-2 text-center text-sm sm:text-base">
                    {d.faculty}
                  </td>
                  <td className="px-4 py-2 text-center text-sm sm:text-base">
                    {d.department}
                  </td>
                  <td className="px-4 py-2 text-center text-sm sm:text-base">
                    {d.faculty_of_code}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      type="button"
                      className="rounded bg-sky-500 px-4 py-2 text-sm text-white sm:text-base"
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
          className="rounded bg-sky-500 px-4 py-2 text-sm text-white sm:text-base"
        >
          閉じる
        </button>
      </div>
    </div>
  )
}
