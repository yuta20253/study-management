import { University } from '@/types/SearchResult/Exam'

export const selectSecondExamSubjects = (
  universities: University[],
  checkedSubjects: string[],
  selectableUniversities: string[],
  returnUniversities: University[] = [],
  exam_subjects: string,
): University[] => {
  universities.map((s) =>
    console.log(`${s.university}大学${s.faculty}学部${s.department}学科`),
  )

  //const [deleteNotAlternative, setDeleteNotAlternative] = useState<string[]>([])

  //選択した項目なので_alternativeがついていない
  console.log(checkedSubjects)

  universities.map((university) => {
    if (university.second_exam_subjects === undefined) {
      console.log('2次・個別の試験がありません')
      //returnUniversities.push(...universities)
    } else {
      let arrangeKey: string
      const arrayMatchKeys: string[] = []
      for (const [key, value] of Object.entries(
        university.second_exam_subjects[0],
      )) {
        //1. jsonの一覧からkeyを取得してそれにkeyをつけている
        arrangeKey = exam_subjects + key

        // 2. 1を配列に入れる
        arrayMatchKeys.push(arrangeKey)
        //arrayMatchKeys.map((a) => console.log(`arrayMatchKeys:::${a}`))
        console.log(arrayMatchKeys)
      }
      // 3. 新たにsecond_exam_subjects + ~ の key群の中でチェックボックスにチェックしていた教科を除外する
      const filterKeys = arrayMatchKeys.filter(
        (item) => checkedSubjects.indexOf(item) == -1,
      )

      if (filterKeys.length === 0) {
        console.log('現在filterKeysに要素はありません')
      }
      filterKeys.map((str) => console.log(`secondのstr:::${str}`))
      const copyCheckedItemsArr: string[] = []
      checkedSubjects.map((elm) => {
        if (filterKeys.length > 0 && filterKeys.indexOf(elm)) {
          console.log(`filterKeysは${elm}を含んでいません`)
          const altStr = `${elm}_alternative`
          console.log(altStr)
          copyCheckedItemsArr.push(altStr)
        }
      })

      //英・国を選択している場合

      //英・国が入っている
      console.log(
        `2次・個別のcopyCheckedItemsArr:::::${university.university}大学${university.faculty}学部${university.department}学科:::::${copyCheckedItemsArr}`,
      )
      //数・理・社・情が選ばれていない
      console.log(
        `2次・個別のfilterKeysの選択されていない科目（配列を空にする前）::::::${university.university}大学${university.faculty}学部${university.department}学科:::::${filterKeys}`,
      )

      // alternativeうまくいっかない
      const deleteNotAlternative = filterKeys.filter((key) => {
        console.log(key)
        return !key.includes('alternative')
      })

      //本当は選択されていない選択可能科目のうち１つでもcopyCheckedItemsArrに含まれている場合はfilterKeysを空にする
      //現状
      //たとえば英・国・社を選択していたとする。.
      //慶應のように英・社・小論文みたいに国が教科にない場合
      //本当は小論文が含まれていないって形で弾きたいのに、英語が合致してしまってarrayMatchKeysが要素0になってしまう

      arrayMatchKeys.map((elm) => {
        console.log(elm)
        const altStr = elm + '_alternative'
        console.log(
          Object.keys(university.second_exam_subjects[0]).indexOf(altStr),
        )
        if (copyCheckedItemsArr.indexOf(altStr) !== -1) {
          //機能しているか確認
          console.log('機能しています！！！！！！一致しました')
        } else {
          console.log('一致しませんでした')
          console.log(`現在の配列内filterKeysの要素数:::::${filterKeys.length}`)
        }
      })

      deleteNotAlternative.map((i) =>
        console.log(`値::::::::::::::::::::::::${i}`),
      )

      //選択したリストの中にfirst_exam_subjectsがついているものがないのなら（科目が選択されていないのなら）filterKeysを空にする
      console.log(`接頭尾:::::${exam_subjects}`)
      if (copyCheckedItemsArr.indexOf(exam_subjects) !== -1) {
        console.log('削除します')
        //filterKeys.splice(0)
      }

      console.log(
        `選択されていない科目（これが存在しない場合はok）:::::${university.university}大学${university.faculty}学部${university.department}学科:::::${deleteNotAlternative},,,,,,,,,,,要素数:::${deleteNotAlternative.length}`,
      )
      //console.log(filterKeys.length)

      console.log(`deleteNotAlternative:::::${deleteNotAlternative.length}`)

      if (deleteNotAlternative.length < 1) {
        //const str = `${university.university}大学${university.faculty}学部${university.department}学科`
        const str = `${university.university}大学${university.faculty}学部${university.department}学科の受験科目は選択された教科で受験可能です`
        //console.log(`当大学学部学科の受験科目:::::${arrayMatchKeys}`)
        //console.log(Object.keys(university.first_exam_subjects['0']))
        selectableUniversities.push(str)
        returnUniversities.push(university)
      } else {
        console.log(
          `filterKeysの要素数は１以上です。：：：：：要素数:::${deleteNotAlternative.length}`,
        )
        return
      }
    }
  })

  returnUniversities.map((university) =>
    console.log(
      `${university.university}大学${university.faculty}学部${university.department}学科`,
    ),
  )
  return returnUniversities
}
