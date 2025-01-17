import { useState } from 'react'
import { CommonEntranceExaminationSubjectsAccordion } from './CommonEntranceExaminationSubjectsAccordion'
import { SecondEntranceExaminationSubjectsAccordion } from './SecondEntranceExaminationSubjectsAccordion'

export const EntranceExaminationSubjectAndScoreAccordionySystemAccordion = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  return (
    <div className="w-full">
      <div
        onClick={() => {
          console.log('isActiveが作動しました')
          setIsActive(!isActive)
        }}
        className="flex items-center justify-between border bg-slate-100 text-xl px-4 py-3 sm:px-6 sm:py-4 cursor-pointer"
      >
        <span className="w-full">入試科目</span>
        <span className="flex items-center justify-center w-8 h-8">
          {isActive ? (
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

      {isActive && (
        <div className="p-4 sm:p-6">
          <div>
            <CommonEntranceExaminationSubjectsAccordion
              entranceExamination="共通テスト"
              foreignLanguage="英語"
              math="数学"
              nationallang="国語"
              science="理科"
              geographical_history_citizens="地歴・公民"
              information="情報"
              essay="小論文"
              practical_skills="実技" // 実技
              comprehensive_question="総合問題" // 総合問題
              certification_exam="英語資格・検定試験" // 英語資格・検定試験
            />
            <SecondEntranceExaminationSubjectsAccordion
              entranceExamination="2次試験・個別学力検査"
              foreignLanguage="英語"
              math="数学"
              nationallang="国語"
              science="理科"
              geographical_history_citizens="地歴・公民"
              information="情報"
              essay="小論文"
              practical_skills="実技" // 実技
              comprehensive_question="総合問題" // 総合問題
              certification_exam="英語資格・検定試験" // 英語資格・検定試験
            />
          </div>
        </div>
      )}
    </div>
  )
}
