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
  const { handleChange, checkedItems ,handleClearSecondEntranceExaminationSunjects } =
    useContext(CheckBoxContext)

  return (
    <div className="mx-auto mb-5 w-full sm:w-5/6">
      {/* Accordion Header */}
      <div
        onClick={() => setOpenEntranceType(!openEntranceType)}
        className="flex cursor-pointer items-center justify-between border bg-slate-100 px-4 py-3 text-xl sm:px-6 sm:py-4"
      >
        <span className="w-full">{entranceExamination}</span>
        <span className="flex size-8 items-center justify-center">
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
      {openEntranceType && (
        <div className="mx-auto my-5 w-full sm:w-5/6">
          <div className="mb-1">
            <button
              className="rounded bg-red-500 px-4 py-2 text-white"
              type="button"
              onClick={handleClearSecondEntranceExaminationSunjects}
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
                          value="second_exam_subjects.english"
                          onChange={(e) => handleChange(e)}
                          checked={checkedItems.includes('second_exam_subjects.english')}
                        />
                        <span></span>
                        <b>{foreignLanguage}</b>
                      </label>
                    </div>
                  </td>
                </tr>
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
                          value="second_exam_subjects.math"
                          onChange={(e) => handleChange(e)}
                          checked={checkedItems.includes('second_exam_subjects.math')}
                        />
                        <span></span>
                        <b>{math}</b>
                      </label>
                    </div>
                  </td>
                </tr>
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
                          value="second_exam_subjects.nationallang"
                          onChange={(e) => handleChange(e)}
                          checked={checkedItems.includes('second_exam_subjects.nationallang')}
                        />
                        <span></span>
                        <b>{nationallang}</b>
                      </label>
                    </div>
                  </td>
                </tr>
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
                          value="second_exam_subjects.science"
                          onChange={(e) => handleChange(e)}    
                          checked={checkedItems.includes('second_exam_subjects.science')}            
                        />
                        <span></span>
                        <b>{science}</b>
                      </label>
                    </div>
                  </td>
                </tr>
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
                          value="second_exam_subjects.geographical_history_citizens"
                          onChange={(e) => handleChange(e)}   
                          checked={checkedItems.includes('second_exam_subjects.geographical_history_citizens')}              
                        />
                        <span></span>
                        <b>{geographical_history_citizens}</b>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="mr-10 border border-gray-500 bg-sky-500">
                    <span className="text-white">その他</span>
                  </th>
                  <td className="pl-10">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label>
                          <input
                            name="second_exam_subjects.information"
                            type="checkbox"
                            value="second_exam_subjects.information"
                            onChange={(e) => handleChange(e)}
                            checked={checkedItems.includes('second_exam_subjects.information')}
                          />
                          <span></span>
                          <b>{information}</b>
                        </label>
                      </div>

                      <div>
                        <label>
                          <input
                            name="second_exam_subjects.essay"
                            type="checkbox"
                            value="second_exam_subjects.essay"
                            onChange={(e) => handleChange(e)}           
                            checked={checkedItems.includes('second_exam_subjects.essay')}          
                          />
                          <span></span>
                          <b>{essay}</b>
                        </label>
                      </div>

                      <div>
                        <label>
                          <input
                            name="second_exam_subjects.practical_skills"
                            type="checkbox"
                            value="second_exam_subjects.practical_skills"
                            onChange={(e) => handleChange(e)}        
                            checked={checkedItems.includes('second_exam_subjects.practical_skills')}    
                          />
                          <span></span>
                          <b>{practical_skills}</b>
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            name="second_exam_subjects.comprehensive_question"
                            type="checkbox"
                            value="second_exam_subjects.comprehensive_question"
                            onChange={(e) => handleChange(e)}             
                            checked={checkedItems.includes('second_exam_subjects.comprehensive_question')}        
                          />
                          <span></span>
                          <b>{comprehensive_question}</b>
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            name="second_exam_subjects.certification_exam"
                            type="checkbox"
                            value="second_exam_subjects.certification_exam"
                            onChange={(e) => handleChange(e)}     
                            checked={checkedItems.includes('second_exam_subjects.certification_exam')}                 
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
