import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Title,
} from 'chart.js/auto'

import { useState, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import {
  HoursOfDate,
  StudyTimesProps,
} from '@/types/Management/Graph/SubjectStudyTimeLine'
import { formatDate } from '@/utils/Common/formatDate'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default function SubjectStudyTimeLine({
  studyData,
  title,
  subjectName,
  sentlabels,
}: StudyTimesProps) {
  const [isReloaded, setIsReloaded] = useState<boolean>(false)
  const [labels, setLabels] = useState<string[]>([])
  const chartRef = useRef<ChartJS<'line', number[], string>>(null)
  if (!subjectName) return <div>科目を選択してください...</div>
  console.log(studyData)

  if (!isReloaded) {
    sentlabels.map((data) => {
      setLabels((prevArr) => [...prevArr, data])
    })
    setIsReloaded(!isReloaded)
  }

  const toSetLabels: string[] = []
  studyData.filter((data) => {
    if (data.subject === subjectName) {
      toSetLabels.push(formatDate(data.created_at))
    }
  })

  const toSetValues: number[] = []
  studyData.map((data) => {
    if (data.subject === subjectName) {
      toSetValues.push(data.actual_learning_time)
    }
  })

  const editedDate = new Set(labels)
  const uniqueDate = Array.from(editedDate)

  const dateOfTimes: HoursOfDate[] = []

  for (let index = 0; index < uniqueDate.length; index++) {
    dateOfTimes.push({ date: uniqueDate[index], subject: subjectName, time: 0 })
  }

  studyData.map((data) => {
    for (let index = 0; index < dateOfTimes.length; index++) {
      if (
        formatDate(data.created_at) === dateOfTimes[index].date &&
        data.subject === subjectName
      ) {
        dateOfTimes[index].time += data.actual_learning_time
      }
    }
  })

  const toSetGraphLabels: string[] = []
  const toSetGraphValues: number[] = []

  dateOfTimes.map((data) => {
    toSetGraphLabels.push(data.date)
    toSetGraphValues.push(data.time)
  })

  const data = {
    labels: toSetGraphLabels,
    datasets: [
      {
        label: subjectName,
        data: toSetGraphValues,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
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
    <Line
      data={data}
      height={300}
      width={300}
      ref={chartRef}
      options={options}
    />
  )
}
