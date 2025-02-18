export const formatDate = (acceptedDate: Date) => {
  const dueDate = new Date(String(acceptedDate))
  const year = dueDate.getFullYear()
  const month = dueDate.getMonth() + 1
  const day = dueDate.getDate()
  const date = `${year}/${month}/${day}`
  return date
}

export const dueDateFormat = (acceptedDate: Date) => {
  const dueDate = new Date(String(acceptedDate))
  const year = dueDate.getFullYear()
  const month = dueDate.getMonth() + 1
  const subDay = dueDate.getDate()
  const day = String(subDay).length < 2 ? '0' + `${subDay}` : `${subDay}`
  const date = `${year}-${month}-${day}`
  return date
}
