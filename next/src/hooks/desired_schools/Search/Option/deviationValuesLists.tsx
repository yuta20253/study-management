export const deviationValuesLists = (deviationValuesArr: number[]) => {
  const newValues = []
  let value = deviationValuesArr[0]
  while (value <= deviationValuesArr[1]) {
    newValues.push(value)
    value += 2.5
  }
  return newValues
}
