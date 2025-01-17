import { SelectGraphProps } from '@/types/Management/selectType'

export const SelectGraph: React.FC<SelectGraphProps> = ({
  handleSelectGraph,
}: SelectGraphProps) => {
  return (
    <div className="m-1 bg-slate-200 p-1">
      <div className="m-1 bg-slate-100 p-1">
        <label className="p-1" htmlFor="graph-select">
          表示グラフ変更 :
        </label>
        <select id="graph-select" onChange={(e) => handleSelectGraph(e)}>
        <option value="">グラフを選択</option>
          <option value={'学習タイプ別割合'}>学習タイプ別割合</option>
          <option value={'学習時間比較'}>学習時間比較</option>
          <option value={'科目別学習時間推移'}>科目別学習時間推移</option>
        </select>
      </div>
    </div>
  )
}
