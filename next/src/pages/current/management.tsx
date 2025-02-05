import { NextPage } from 'next'
import { LoadingScreen } from '@/components/Loading'
import { ErrorTemplate } from '@/components/page/Common/ErrorTemplate'
import LinkButton from '@/components/page/Common/LinkButton'
import { ChangesInStudytTimeBySubjectBlock } from '@/components/page/management/Block/ChangesInStudytTimeBySubjectBlock'
import { SelectedItemsListsBlock } from '@/components/page/management/Block/SelectedItemsListsBlock'
import { StudyComparisonWithPeopleBarBlock } from '@/components/page/management/Block/StudyComparisonWithPeopleBarBlock'
import { StudyPieGraphBlock } from '@/components/page/management/Block/StudyPieGraphBlock'
import { StudyTypePieGraphBlock } from '@/components/page/management/Block/StudyTypePieGraphBlock'
import { SubjectStudyTimeLineBlock } from '@/components/page/management/Block/SubjectStudyTimeLineBlock'
import { ManagementList } from '@/components/page/management/List/ManagementList'
import { StudyHistoryDetail } from '@/components/page/management/Modal/StudyHistoryDetail'
import { SubjectHistoryDetail } from '@/components/page/management/Modal/SubjectHistoryDetail'
import { SelectPeriodLists } from '@/components/page/management/Option/SelectPeriodLists'
import { SelectStudyType } from '@/components/page/management/Option/SelectStudyType'
import { SelectSubject } from '@/components/page/management/Option/SelectSubject'
import { useDataState } from '@/hooks/management/useDataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const Management: NextPage = () => {
  useRequireSignedIn()
  const {
    isOpen,
    onOpen,
    onClose,
    user,
    studyHours,
    studyLists,
    allStudyHours,
    selectedSubject,
    displiedPeriod,
    selectedPeriod,
    studyType,
    title,
    todoId,
    subjectName,
    selectSubjectProps,
    sentlabels,
    graph,
    secondModalOpen,
    setSecondModalOpen,
    forModalSubject,
    setForModalSubject,
    handleSelectSubject,
    handleCreatePeriod,
    handleChangeDisplayPeriod,
    handleChangeStudyType,
    handleClickStudy,
    handleSelectSubjectName,
    handleSelectGraph,
    error,
  } = useDataState()

  if (error) {
    return (
      <ErrorTemplate error={error} href={'/current/home'} text={'ホームへ'} />
    )
  }

  if (!studyHours || !allStudyHours) {
    return <LoadingScreen />
  }

  return (
    <div className="mt-10 w-full px-4 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center justify-center gap-6 sm:grid sm:grid-cols-1 lg:grid-cols-2">
        <div className="w-full">
          <StudyPieGraphBlock
            studyHours={studyHours}
            title="教科別学習割合(時間)"
            secondModalOpen={secondModalOpen}
            setSecondModalOpen={setSecondModalOpen}
            setForModalSubject={setForModalSubject}
          />
        </div>
        {graph === '学習タイプ別割合' && (
          <div className="w-full">
            <StudyTypePieGraphBlock
              title="学習タイプ別割合"
              studyHours={studyHours}
            />
          </div>
        )}
        {graph === '学習時間比較' && (
          <div className="w-full">
            <StudyComparisonWithPeopleBarBlock
              studyData={allStudyHours}
              title="学習時間比較(対ライバル)"
              followers={user.followers.length}
            />
          </div>
        )}
        {graph === '科目別学習時間推移' && (
          <div className="w-full">
            <SubjectStudyTimeLineBlock
              studyData={selectSubjectProps}
              title="科目別学習時間推移"
              subjectName={subjectName}
              sentlabels={sentlabels}
            />
          </div>
        )}
      </div>
      {graph === '科目別学習時間推移' && (
        <ChangesInStudytTimeBySubjectBlock
          subjectName={subjectName}
          selectSubject={SelectSubject}
          handleSelectSubjectName={handleSelectSubjectName}
        />
      )}
      <SelectedItemsListsBlock
        handleSelectGraph={handleSelectGraph}
        subjectName={subjectName}
        handleSelectSubject={handleSelectSubject}
        selectSubject={SelectSubject}
        displiedPeriod={displiedPeriod}
        selectPeriodLists={SelectPeriodLists}
        handleChangeDisplayPeriod={handleChangeDisplayPeriod}
        handleCreatePeriod={handleCreatePeriod}
        studyType={studyType}
        handleChangeStudyType={handleChangeStudyType}
        selectStudyType={SelectStudyType}
      />
      <div className="mt-2 flex flex-col items-center justify-center space-y-6">
        {isOpen && (
          <div className="absolute top-40 z-10 flex w-full items-center justify-center sm:w-11/12 md:w-1/2 lg:w-1/3">
            <StudyHistoryDetail
              title={title}
              todo_id={todoId}
              onClose={onClose}
              studyLists={studyLists}
            />
          </div>
        )}
        {secondModalOpen && (
          <div className="absolute top-40 z-10 flex w-full items-center justify-center sm:w-11/12 md:w-1/2 lg:w-1/3">
            <SubjectHistoryDetail
              subjectLists={studyHours}
              subject={forModalSubject}
              setSecondModalOpen={setSecondModalOpen}
            />
          </div>
        )}
      </div>
      <div className="mt-2 flex w-full items-center justify-center">
        <ManagementList
          studyHours={studyHours}
          selectedSubject={selectedSubject}
          selectedPeriod={selectedPeriod}
          studyType={studyType}
          onOpen={onOpen}
          handleClickStudy={handleClickStudy}
        />
      </div>
      <div className="mt-4 flex h-12 w-full flex-col items-center justify-end gap-2 sm:mt-6 sm:w-2/3 sm:flex-row sm:gap-4">
        <div>
          <LinkButton href={'/current/home'} text={'ホームへ'} />
        </div>
      </div>
    </div>
  )
}

export default Management
