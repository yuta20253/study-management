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
import { StudyGraphDataProps } from '@/types/Management/Graph/StudyPie'
const subjects = [
  '英語',
  '現代文',
  '古文',
  '漢文',
  '数学',
  '日本史',
  '世界史',
  '政治経済',
  '地理',
  '物理',
  '化学',
  '生物',
  '地学',
]

ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default function StudyPieGraph({
  studyData,
  title,
  secondModalOpen,
  setSecondModalOpen,
  setForModalSubject,
}: StudyGraphDataProps) {
  const [isReloaded, setIsReloaded] = useState<boolean>(false)
  const [engTimes, setEngTimes] = useState<number>(0)
  const [modernJaTimes, setModernJaTimes] = useState<number>(0)
  const [classicalLiteratureTimes, setClassicalLiteratureTimes] =
    useState<number>(0)
  const [chineseLanguageTimes, setChineseLanguageTimes] = useState<number>(0)
  const [mathTimes, setMathTimes] = useState<number>(0)
  const [japHisTimes, setJapHisTimes] = useState<number>(0)
  const [worldHistoryTimes, setWorldHistoryTimes] = useState<number>(0)
  const [politicalEconomyTimes, setPoliticalEconomyTimes] = useState<number>(0)
  const [geographyTimes, setGeographyTimes] = useState<number>(0)
  const [physicsTimes, setPhysicsTimes] = useState<number>(0)
  const [chemistryTimes, setChemistryTimes] = useState<number>(0)
  const [biologyTimes, setBiologyTimes] = useState<number>(0)
  const [geologyTimes, setGeologyTimes] = useState<number>(0)
  const chartRef = useRef<ChartJS<'pie', number[], string>>(null)
  console.log(secondModalOpen)
  if (!isReloaded) {
    studyData.map((stu) => {
      if (stu.subject == '英語') {
        setEngTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '現代文') {
        setModernJaTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '古文') {
        setClassicalLiteratureTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '漢文') {
        setChineseLanguageTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '数学') {
        setMathTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '日本史') {
        setJapHisTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '世界史') {
        setWorldHistoryTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '政治経済') {
        setPoliticalEconomyTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '地理') {
        setGeographyTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '物理') {
        setPhysicsTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '化学') {
        setChemistryTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '生物') {
        setBiologyTimes((nun) => nun + stu.actual_learning_time)
      } else if (stu.subject == '地学') {
        setGeologyTimes((nun) => nun + stu.actual_learning_time)
      }
    })
    setIsReloaded(!isReloaded)
  }

  const data = {
    labels: [
      subjects[0],
      subjects[1],
      subjects[2],
      subjects[3],
      subjects[4],
      subjects[5],
      subjects[6],
      subjects[7],
      subjects[8],
      subjects[9],
      subjects[10],
      subjects[11],
      subjects[12],
    ],
    datasets: [
      {
        data: [
          engTimes,
          modernJaTimes,
          classicalLiteratureTimes,
          chineseLanguageTimes,
          mathTimes,
          japHisTimes,
          worldHistoryTimes,
          politicalEconomyTimes,
          geographyTimes,
          physicsTimes,
          chemistryTimes,
          biologyTimes,
          geologyTimes,
        ],
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
    events: ['click'],
    onClick: function (e, el) {
      if (!el || el.length === 0) return

      const s = el[0].index
      setSecondModalOpen(true)
      setForModalSubject(subjects[s])
    },

    maintainAspectRatio: false,
  }

  return (
    <div>
      <Pie
        data={data}
        height={280}
        width={280}
        ref={chartRef}
        options={options}
      />
    </div>
  )
}

