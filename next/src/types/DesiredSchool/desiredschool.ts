// University 型の定義例
export type UniversityData = {
  university: string
  code: number
}

export type UniversityProp = {
  school: string
  data: UniversityData[]
}

export type JsonUniversity = UniversityProp[][]
