// University 型の定義例
export interface UniversityData {
  university: string // 大学名
  code: number // 大学のコード（例: 12345）
}

export interface UniversityProp {
  school: string // 大学名
  data: UniversityData[] // 大学データ（複数可）
}

export type JsonUniversity = UniversityProp[][]
