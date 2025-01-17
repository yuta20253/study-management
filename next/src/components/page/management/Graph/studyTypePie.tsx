import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Title,
} from 'chart.js/auto'
import { useState, useRef } from 'react'
import { Pie } from 'react-chartjs-2'
import { StudyGraphDataProps } from '@/types/Management/Graph/StudyTypePie'

const studyType = ['予習', '授業', '復習']

ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default function StudyTypePieGraph({
  studyData,
  title,
}: StudyGraphDataProps) {
  const [isReloaded, setIsReloaded] = useState<boolean>(false)
  const [preparation, setPreparation] = useState<number>(0)
  const [lesson, setLesson] = useState<number>(0)
  const [review, setReview] = useState<number>(0)
  const chartRef = useRef<ChartJS<'pie', number[], string>>(null)

  //console.log(studyData)
  if (!isReloaded) {
    studyData.map((stu) => {
      if (stu.study_type === 'preparation') {
        setPreparation((num) => num + stu.actual_learning_time)
      } else if (stu.study_type === 'lesson') {
        setLesson((num) => num + stu.actual_learning_time)
      } else {
        setReview((num) => num + stu.actual_learning_time)
      }
    })
    setIsReloaded(!isReloaded)
  }
  const data = {
    labels: [studyType[0], studyType[1], studyType[2]],
    datasets: [
      {
        data: [preparation, lesson, review],
      },
    ],
  }

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
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
    <Pie
      data={data}
      height={300}
      width={300}
      ref={chartRef}
      options={options}
    />
  )
}
