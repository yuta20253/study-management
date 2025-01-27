export const nameRules = {
  required: '入力必須です',
}
export const nameKanaRules = {
  required: '入力必須です',
  pattern: { value: /^[ァ-ンヴー]*$/, message: 'カタカナで入力してください' },
}

export const postalCodeRule = {
  required: '入力必須です',
  pattern: { value: /^\d{3}-?\d{4}$/, message: '郵便番号が不正です' },
}

export const buildingRule = {
  required: '入力必須です',
}

export const phoneNumberRules = {
  required: '入力必須です',
  pattern: {
    value: /^0\d{1,4}-\d{1,4}-\d{3,4}$/,
    message: '携帯番号は不正です',
  },
}
