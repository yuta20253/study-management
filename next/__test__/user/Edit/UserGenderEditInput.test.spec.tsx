import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { UserGenderEditRadio } from '@/components/page/user/Form/UserGenderEditRadio'

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('UserGenderEditRadio', () => {
  it('性別が初期値で表示されること', () => {
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

    const maleRadio = screen.getByLabelText('男') as HTMLInputElement
    const femaleRadio = screen.getByLabelText('女') as HTMLInputElement

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

    fireEvent.click(femaleRadio)

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

    fireEvent.click(femaleRadio)

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

    fireEvent.click(maleRadio) 
    expect(maleRadio.checked).toBe(true)

    fireEvent.click(femaleRadio)
    expect(femaleRadio.checked).toBe(true)
  })
})
