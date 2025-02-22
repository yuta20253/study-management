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
  const [facultyCode, setFacultyCode] = useState<number>()

  //console.log(universityName)
  //jsonUniversity.map((universityArray) => {
  //universityArray.map((uni) =>
  //console.log(`大学名:::::${uni['uni']['school']}`),
  //)
  //})

  const uniName = universityName + '大学'
  let selectUniversity: University | undefined
  //jsonUniversity.map((universityArray) => {
  //universityArray.map((uni) =>
  //console.log(`${uni['uni']['data'][0]['faculty']}`),
  //)
  //})

  //console.log(jsonUniversity[0][0]['uni']['data'].length)

  jsonUniversity.map((universityArray) => {
    universityArray.map((uni) => {
      //console.log(
      //`uni['uni']['school']:::${uni['uni']['school']}:::uniName:::${uniName}`,
      //)
      if (uni['uni']['school'] === uniName) {
        //console.log('一致しました')
        selectUniversity = uni
      }
    })
  })

  //console.log(
  //`selectUniversity::::::${selectUniversity?.uni.school}が一致しました`,
  //)

  //selectUniversity?.uni.data.map((d) => console.log(d.faculty))

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
    console.log(postData)

    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/current/desired_schools'

    const header = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    const data = postData

    console.log(data)

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
      .catch((e: AxiosError<{ error: string }>) => console.log(e.message))
  }

  console.log(facultyCode)

  return (
    <div className="absolute top-20 z-20 mt-10 w-1/2 items-center justify-center">
      <div className="m-2 flex w-4/5  items-center justify-center rounded p-2">
        <div className="w-full border border-slate-500">
          <table className="w-full bg-cyan-100">
            <thead className="bg-sky-700">
              <tr className="">
                <th className="text-white">大学名</th>
                <th className="text-white">学部名</th>
                <th className="text-white">学科名</th>
                <th className="text-white">学部コード</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {selectUniversity?.uni.data.map((d, i: number) => (
                <tr key={i} className="border-t">
                  <td className="text-center">{d.university}</td>
                  <td className="text-center">{d.faculty}</td>
                  <td className="text-center">{d.department}</td>
                  <td className="text-center">{d.faculty_of_code}</td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="rounded bg-sky-500 px-3 text-white"
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
      <div className="float-right rounded bg-sky-500 p-1 px-2">
        <button onClick={onClose}>
          <span className="text-white">閉じる</span>
        </button>
      </div>
    </div>
  )
}
