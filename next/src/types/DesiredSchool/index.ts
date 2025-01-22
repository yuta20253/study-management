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

export type DesiredSchoolProps = {
  id: number
  university: string
  faculty: string
  department: string
  code: number
  faculty_of_code: number
}

export type NewUniversity = {
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
export type UniversityPrefecture = {
  school: string
  prefecture: string
  division: string
  code: number
  data: [
    {
      code: number
      region: string
      undergraduate_system: string
      university: string
      faculty: string
      department: string
      deviation_value: string
      location: string
      faculty_of_code: number
      explanation: string
      capacity: string
      division: string
      department_system: string
    },
  ]
}

export type DeviationValue = {
  deviationValues: number[]
  handleClearDeviationValues: () => void
}
