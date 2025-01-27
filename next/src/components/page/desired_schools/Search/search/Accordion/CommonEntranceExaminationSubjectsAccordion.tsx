import { useContext, useState } from 'react'
import { CommonEntranceExaminationSubjectsAccordionProps } from '@/types/DesiredSchool/Accordion/Accordion'
import { CheckBoxContext } from '@/types/DesiredSchool/Context/option_context'

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
  const {
    handleChange,
    checkedItems,
    handleClearCommonEntranceExaminationSunjects,
  } = useContext(CheckBoxContext)

  return (
    <div className="mx-auto mt-5 w-full sm:w-5/6">
      {/* Accordion Header */}
      <div
        onClick={() => setOpenEntranceType(!openEntranceType)}
        className="flex cursor-pointer items-center justify-between border bg-slate-100 px-4 py-2 text-xl sm:px-6 sm:py-3"
      >
        <span className="w-full">{entranceExamination}</span>
        <span className="flex size-8 items-center justify-center">
          {openEntranceType ? (
            <svg
              data-accordion-icon
              className="shrink-0"
              aria-hidden="true"
              xmlns="http:www.w3.org/2000/svg"
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
              xmlns="http:www.w3.org/2000/svg"
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
          <div className="mb-1">
            <button
              className="rounded bg-red-500 px-4 py-2 text-white"
              type="button"
              onClick={handleClearCommonEntranceExaminationSunjects}
            >
              <b>条件をクリア</b>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <colgroup>
                <col className="w-1/3" />
                <col className="w-2/3" />
              </colgroup>
              <tbody className="border border-gray-500">
                {/* Foreign Language */}
                <tr>
                  <th className="mr-10 border border-gray-500 bg-sky-500">
                    <span className="text-white">外国語</span>
                  </th>
                  <td className="pl-10">
                    <div>
                      <label className="block">
                        <input
                          name="first_exam_subjects.english"
                          type="checkbox"
                          value="first_exam_subjects.english"
                          onChange={(e) => handleChange(e)}
                          checked={checkedItems.includes(
                            'first_exam_subjects.english',
                          )}
                          className="mr-2"
                        />
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
                      <label className="block">
                        <input
                          name="first_exam_subjects.math"
                          type="checkbox"
                          value="first_exam_subjects.math"
                          onChange={(e) => handleChange(e)}
                          checked={checkedItems.includes(
                            'first_exam_subjects.math',
                          )}
                          className="mr-2"
                        />
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
                      <label className="block">
                        <input
                          name="first_exam_subjects.nationallang"
                          type="checkbox"
                          value="first_exam_subjects.nationallang"
                          onChange={(e) => handleChange(e)}
                          checked={checkedItems.includes(
                            'first_exam_subjects.nationallang',
                          )}
                          className="mr-2"
                        />
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
                      <label className="block">
                        <input
                          name="first_exam_subjects.science"
                          type="checkbox"
                          value="first_exam_subjects.science"
                          onChange={(e) => handleChange(e)}
                          checked={checkedItems.includes(
                            'first_exam_subjects.science',
                          )}
                          className="mr-2"
                        />
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
                      <label className="block">
                        <input
                          name="first_exam_subjects.geographical_history_citizens"
                          type="checkbox"
                          value="first_exam_subjects.geographical_history_citizens"
                          onChange={(e) => handleChange(e)}
                          checked={checkedItems.includes(
                            'first_exam_subjects.geographical_history_citizens',
                          )}
                          className="mr-2"
                        />
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label className="block">
                          <input
                            name="first_exam_subjects.information"
                            type="checkbox"
                            value="first_exam_subjects.information"
                            onChange={(e) => handleChange(e)}
                            checked={checkedItems.includes(
                              'first_exam_subjects.information',
                            )}
                            className="mr-2"
                          />
                          <b>{information}</b>
                        </label>
                      </div>
                      <div>
                        <label className="block">
                          <input
                            name="first_exam_subjects.essay"
                            type="checkbox"
                            value="first_exam_subjects.essay"
                            onChange={(e) => handleChange(e)}
                            checked={checkedItems.includes(
                              'first_exam_subjects.essay',
                            )}
                            className="mr-2"
                          />
                          <b>{essay}</b>
                        </label>
                      </div>
                      <div>
                        <label className="block">
                          <input
                            name="first_exam_subjects.practical_skills"
                            type="checkbox"
                            value="first_exam_subjects.practical_skills"
                            onChange={(e) => handleChange(e)}
                            checked={checkedItems.includes(
                              'first_exam_subjects.practical_skills',
                            )}
                            className="mr-2"
                          />
                          <b>{practical_skills}</b>
                        </label>
                      </div>
                      <div>
                        <label className="block">
                          <input
                            name="first_exam_subjects.comprehensive_question"
                            type="checkbox"
                            value="first_exam_subjects.comprehensive_question"
                            onChange={(e) => handleChange(e)}
                            checked={checkedItems.includes(
                              'first_exam_subjects.comprehensive_question',
                            )}
                            className="mr-2"
                          />
                          <b>{comprehensive_question}</b>
                        </label>
                      </div>
                      <div>
                        <label className="block">
                          <input
                            name="first_exam_subjects.certification_exam"
                            type="checkbox"
                            value="first_exam_subjects.certification_exam"
                            onChange={(e) => handleChange(e)}
                            checked={checkedItems.includes(
                              'first_exam_subjects.certification_exam',
                            )}
                            className="mr-2"
                          />
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
