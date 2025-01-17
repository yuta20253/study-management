import { useContext, useState } from 'react'
import { SecondEntranceExaminationSubjectsAccordionProps } from '@/types/DesiredSchool/Accordion/Accordion'
import { CheckBoxContext } from '@/types/DesiredSchool/Context/option'

export const SecondEntranceExaminationSubjectsAccordion: React.FC<
  SecondEntranceExaminationSubjectsAccordionProps
> = ({
  entranceExamination,
  foreignLanguage,
  math,
  nationallang,
  science,
  geographical_history_citizens,
  information,
  essay,
  practical_skills, // 実技
  comprehensive_question, // 総合問題
  certification_exam, // 英語資格・検定試験
}: SecondEntranceExaminationSubjectsAccordionProps) => {
  const [openEntranceType, setOpenEntranceType] = useState<boolean>(false)
  const { handleChange } = useContext(CheckBoxContext)

  return (
    <div className="mx-auto mb-5 w-full sm:w-5/6">
      {/* Accordion Header */}
      <div
        onClick={() => setOpenEntranceType(!openEntranceType)}
        className="flex items-center justify-between border bg-slate-100 text-xl px-4 py-3 sm:px-6 sm:py-4 cursor-pointer"
      >
        <span className="w-full">{entranceExamination}</span>
        <span className="flex items-center justify-center w-8 h-8">
          {openEntranceType ? (
            <svg
              data-accordion-icon
              className="shrink-0"
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
              className="shrink-0 rotate-180"
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

      {/* Accordion Body */}
      {openEntranceType && (
        <div className="mx-auto my-5 w-full sm:w-5/6">
          <div className='mb-1'>
            <button className="rounded bg-red-500 px-4 py-2 text-white">
              <b>条件をクリア</b>
            </button>
          </div>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <colgroup>
                  <col className="w-1/3"/>
                  <col className="w-2/3"/>
                </colgroup>
                <tbody className="border border-gray-500">
                  {/* Foreign Language */}
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">外国語</span>
                    </th>
                    <td className="pl-10">
                      <div>
                        <label>
                          <input
                            name="second_exam_subjects.english"
                            type="checkbox"
                            onChange={(e) => handleChange(e)}
                          />
                          <span></span>
                          <b>{foreignLanguage}</b>
                        </label>
                      </div>
                    </td>
                  </tr>

                  {/* Math */}
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">数学</span>
                    </th>
                    <td className="pl-10">
                      <div>
                        <label>
                          <input
                            name="second_exam_subjects.math"
                            type="checkbox"
                            onChange={(e) => handleChange(e)}
                          />
                          <span></span>
                          <b>{math}</b>
                        </label>
                      </div>
                    </td>
                  </tr>

                  {/* National Language */}
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">国語</span>
                    </th>
                    <td className="pl-10">
                      <div>
                        <label>
                          <input
                            name="second_exam_subjects.nationallang"
                            type="checkbox"
                            onChange={(e) => handleChange(e)}
                          />
                          <span></span>
                          <b>{nationallang}</b>
                        </label>
                      </div>
                    </td>
                  </tr>

                  {/* Science */}
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">理科</span>
                    </th>
                    <td className="pl-10">
                      <div>
                        <label>
                          <input
                            name="second_exam_subjects.science"
                            type="checkbox"
                            onChange={(e) => handleChange(e)}
                          />
                          <span></span>
                          <b>{science}</b>
                        </label>
                      </div>
                    </td>
                  </tr>

                  {/* Geographical History & Civics */}
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">地歴・公民</span>
                    </th>
                    <td className="pl-10">
                      <div>
                        <label>
                          <input
                            name="second_exam_subjects.geographical_history_citizens"
                            type="checkbox"
                            onChange={(e) => handleChange(e)}
                          />
                          <span></span>
                          <b>{geographical_history_citizens}</b>
                        </label>
                      </div>
                    </td>
                  </tr>

                  {/* Other Subjects */}
                  <tr>
                    <th className="mr-10 border border-gray-500 bg-sky-500">
                      <span className="text-white">その他</span>
                    </th>
                    <td className="pl-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Information */}
                        <div>
                          <label>
                            <input
                              name="second_exam_subjects.information"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{information}</b>
                          </label>
                        </div>

                        {/* Essay */}
                        <div>
                          <label>
                            <input
                              name="second_exam_subjects.essay"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{essay}</b>
                          </label>
                        </div>

                        {/* Practical Skills */}
                        <div>
                          <label>
                            <input
                              name="second_exam_subjects.practical_skills"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{practical_skills}</b>
                          </label>
                        </div>

                        {/* Comprehensive Question */}
                        <div>
                          <label>
                            <input
                              name="second_exam_subjects.comprehensive_question"
                              type="checkbox"
                              onChange={(e) => handleChange(e)}
                            />
                            <span></span>
                            <b>{comprehensive_question}</b>
                          </label>
                        </div>

                        {/* Certification Exam */}
                        <div>
                          <label>
                            <input
                              name="second_exam_subjects.certification_exam"
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
      )}
    </div>
  )
}
