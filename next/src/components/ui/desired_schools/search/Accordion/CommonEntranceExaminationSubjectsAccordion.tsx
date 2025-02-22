import { useContext, useState } from 'react'
import { CommonEntranceExaminationSubjectsAccordionProps } from '@/types/DesiredSchool/Accordion/Accordion'
import { CheckBoxContext } from '@/types/DesiredSchool/Context/option'

export const CommonEntranceExaminationSubjectsAccordion: React.FC<
  CommonEntranceExaminationSubjectsAccordionProps
> = ({
  entranceExamination,
  foreignLanguage,
  math,
  nationallang,
  science,
  geographical_history_citizens,
  information,
  essay,
  practical_skills, //実技
  comprehensive_question, //総合問題
  certification_exam, //英語資格・検定試験
}: CommonEntranceExaminationSubjectsAccordionProps) => {
  const [openEntranceType, setOpenEntranceType] = useState<boolean>(false)
  //console.log(`${keyNum}:::${openFacultySystem}`)

  const { handleChange } = useContext(CheckBoxContext)

  return (
    <div className="mx-auto mt-5 w-5/6">
      <div
        onClick={() => setOpenEntranceType(!openEntranceType)}
        className="flex border bg-slate-100 text-xl "
      >
        <span className="w-full">{entranceExamination}</span>
        <span className="float-end flex w-8 items-center">
          {openEntranceType ? (
            <svg
              data-accordion-icon
              className="size-3 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          ) : (
            <svg
              data-accordion-icon
              className="size-3 shrink-0 rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          )}
        </span>
      </div>
      {openEntranceType ? (
        <div className="mx-auto my-5 flex w-5/6">
          <div>
            <div>
              <button>
                <b>条件をクリア</b>
              </button>
            </div>
            <div>
              <table>
                <colgroup>
                  <col></col>
                  <col></col>
                </colgroup>
                <tbody className="border border-gray-500">
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">外国語</span>
                    </th>
                    <td className="pl-10">
                      <div>
                        <div>
                          <label>
                            <input
                              name="first_exam_subjects.english"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{foreignLanguage}</b>
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">数学</span>
                    </th>
                    <td className="pl-10">
                      <div>
                        <div>
                          <label>
                            <input
                              name="first_exam_subjects.math"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{math}</b>
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">国語</span>
                    </th>
                    <td className="pl-10">
                      <div>
                        <div>
                          <label>
                            <input
                              name="first_exam_subjects.nationallang"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{nationallang}</b>
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">理科</span>
                    </th>
                    <td className="pl-10">
                      <div>
                        <div>
                          <label>
                            <input
                              name="first_exam_subjects.science"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{science}</b>
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">地歴・公民</span>
                    </th>
                    <td className="pl-10">
                      <div>
                        <div>
                          <label>
                            <input
                              name="first_exam_subjects.geographical_history_citizens"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{geographical_history_citizens}</b>
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">その他</span>
                    </th>
                    <td className="pl-10">
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <label>
                            <input
                              name="first_exam_subjects.information"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{information}</b>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              name="first_exam_subjects.essay"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{essay}</b>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              name="first_exam_subjects.practical_skills"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{practical_skills}</b>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              name="first_exam_subjects.comprehensive_question"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{comprehensive_question}</b>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              name="first_exam_subjects.certification_exam"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b className="text-xs">{certification_exam}</b>
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : undefined}
    </div>
  )
}
