import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Title,
} from 'chart.js/auto'

import { useState, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { useUserState } from '@/hooks/useGlobalState'
import { studyComparisonWithPeopleBarProps } from '@/types/Management/Graph/StudyComparisonWithPeopleBar'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default function StudyComparisonWithPeopleBar({
  studyData,
  title,
  followers,
}: studyComparisonWithPeopleBarProps) {
  const [user] = useUserState()
  const [isReloaded, setIsReloaded] = useState<boolean>(false)
  const [myPreparationActualLearningTime, setMyPreparationActualLearningTime] =
    useState<number>(0)
  const [myLessonActualLearningTime, setMyLessonActualLearningTime] =
    useState<number>(0)
  const [myReviewActualLearningTime, setMyReviewActualLearningTime] =
    useState<number>(0)
  const [
    otherPreparationActualLearningTime,
    setOtherPreparationActualLearningTime,
  ] = useState<number>(0)
  const [otherLessonActualLearningTime, setOtherLessonActualLearningTime] =
    useState<number>(0)
  const [otherReviewActualLearningTime, setOtherReviewActualLearningTime] =
    useState<number>(0)

  const chartRef = useRef<ChartJS<'bar', number[], string>>(null)

  if (!isReloaded) {
    studyData.map((stu) => {
      if (stu.todo.user_id === user.id) {
        if (stu.study_type === 'preparation') {
          setMyPreparationActualLearningTime(
            (nun) => nun + stu.actual_learning_time,
          )
        } else if (stu.study_type === 'lesson') {
          setMyLessonActualLearningTime((num) => num + stu.actual_learning_time)
        } else {
          setMyReviewActualLearningTime((nun) => nun + stu.actual_learning_time)
        }
      } else {
        if (stu.study_type === 'preparation') {
          setOtherPreparationActualLearningTime(
            (nun) => nun + stu.actual_learning_time,
          )
        } else if (stu.study_type === 'lesson') {
          setOtherLessonActualLearningTime(
            (num) => num + stu.actual_learning_time,
          )
        } else {
          setOtherReviewActualLearningTime(
            (nun) => nun + stu.actual_learning_time,
          )
        }
      }
    })
    setIsReloaded(!isReloaded)
  }

  const data = {
    labels: ['予習', '授業', '復習'],
    datasets: [
      {
        label: '自分',
        data: [
          myPreparationActualLearningTime,
          myLessonActualLearningTime,
          myReviewActualLearningTime,
        ],
        backgroundColor: 'red',
      },
      {
        label: 'ライバル達',
        data: [
          otherPreparationActualLearningTime / followers,
          otherLessonActualLearningTime / followers,
          otherReviewActualLearningTime / followers,
        ],
        backgroundColor: 'blue',
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        position: 'top',
        text: title,
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <Bar
      data={data}
      height={300}
      width={300}
      ref={chartRef}
      options={options}
    />
  )
}

