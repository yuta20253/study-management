export const titleRules = {
  required: 'タイトルは必須です',
}

export const actualLearningTimeRules = {
  required: '入力必須です',
  min: { value: 0, message: '0以上の数値を入力してください' },
  max: { value: 24, message: '24以下の数値を入力してください' },
}

export const descriptionRules = {
  maxLength: { value: 200, message: '200字まで入力は可能です' },
}
