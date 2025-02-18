export type University = {
  uni: {
    school: string
    data: [
      {
        code: number
        faculty_of_code: number
        region: string
        undergraduate_system: string
        university: string
        faculty: string
        department: string
        deviation_value: string
        location: string
        explanation: string
        capacity: string
        division: string
        department_system: string
      },
    ]
  }
}

export type ClickProps = {
  universityName: string
  jsonUniversity: University[][]
  onClose: () => void
}
