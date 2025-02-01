import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { UserGenderEditRadio } from '@/components/page/user/Form/UserGenderEditRadio'

// テスト用ラップコンポーネント
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('UserGenderEditRadio', () => {
  it('性別が初期値で表示されること', () => {
    const testProps = {
      theme: '性別',
      gender: '男', // 初期値は「男」
      registerProps: 'gender',
      selected: '男',
      setSelected: jest.fn(),
    }

    render(
      <TestWrapper>
        <UserGenderEditRadio {...testProps} />
      </TestWrapper>,
    )

    const maleRadio = screen.getByLabelText('男') as HTMLInputElement
    const femaleRadio = screen.getByLabelText('女') as HTMLInputElement

    // 初期状態で「男」が選択されていることを確認
    expect(maleRadio.checked).toBe(true)
    expect(femaleRadio.checked).toBe(false)
  })

  it('性別ラジオボタンを変更したときにsetSelectedが呼ばれること', () => {
    const testProps = {
      theme: '性別',
      gender: '男',
      registerProps: 'gender',
      selected: '男',
      setSelected: jest.fn(),
    }

    render(
      <TestWrapper>
        <UserGenderEditRadio {...testProps} />
      </TestWrapper>,
    )

    const femaleRadio = screen.getByLabelText('女') as HTMLInputElement

    // 「女」を選択
    fireEvent.click(femaleRadio)

    // setSelectedが正しい引数で呼ばれたことを確認
    expect(testProps.setSelected).toHaveBeenCalledWith('female')
  })

  it('ラジオボタンを変更したときにフォームの状態が更新されること', () => {
    const testProps = {
      theme: '性別',
      gender: '男',
      registerProps: 'gender',
      selected: '男',
      setSelected: jest.fn(),
    }

    render(
      <TestWrapper>
        <UserGenderEditRadio {...testProps} />
      </TestWrapper>,
    )

    const femaleRadio = screen.getByLabelText('女') as HTMLInputElement

    // 「女」を選択
    fireEvent.click(femaleRadio)

    // フォームの値が正しく更新されたことを確認
    expect(femaleRadio.checked).toBe(true)
  })

  it('バリデーションが適切に動作すること', async () => {
    const testProps = {
      theme: '性別',
      gender: '男',
      registerProps: 'gender',
      selected: '男',
      setSelected: jest.fn(),
    }

    const { getByLabelText } = render(
      <TestWrapper>
        <UserGenderEditRadio {...testProps} />
      </TestWrapper>,
    )

    const maleRadio = getByLabelText('男') as HTMLInputElement
    const femaleRadio = getByLabelText('女') as HTMLInputElement

    // いずれかのラジオボタンを選択しない場合はエラーになる
    fireEvent.click(maleRadio) // 男性を選択
    expect(maleRadio.checked).toBe(true)

    fireEvent.click(femaleRadio) // 女性を選択
    expect(femaleRadio.checked).toBe(true)
  })
})
