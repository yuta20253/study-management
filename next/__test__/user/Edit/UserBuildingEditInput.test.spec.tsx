import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { act } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { UserBuildingEditInput } from '@/components/page/user/Form/UserBuildingEditInput'

type BuildingProps = {
  theme: string
  props: string
  registerProps: string
  rules?: {
    required: string
    pattern?: {
      value: RegExp
      message: string
    }
  }
  error?: { type: string; message: string }
}

jest.mock('axios')

const TestWrapper = ({
  children,
}: {
  children: React.ReactNode
  testProps: BuildingProps
}) => {
  const method = useForm()
  return <FormProvider {...method}>{children}</FormProvider>
}

const customRender = (component: React.ReactNode) => {
  return render(component)
}

describe('UserBuildingEditInput', () => {
  it('郵便番号入力欄が表示され、入力が正常に処理されるべき', async () => {
    const testProps = {
      theme: '郵便番号',
      props: '',
      registerProps: 'zipcode',
      rules: {
        required: '郵便番号は必須です',
      },
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <UserBuildingEditInput {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByTestId('postal-code-input')

    await act(async () => {
      fireEvent.change(input, { target: { value: '1234567' } })
    })

    expect(input).toHaveValue('1234567')
  })

  it('有効な郵便番号が入力された場合、住所フィールドが自動補完されるべき', async () => {
    ;(axios.get as jest.Mock).mockResolvedValue({
      data: {
        results: [
          {
            address1: '東京都',
            address2: '渋谷区',
            address3: '神南1丁目',
          },
        ],
      },
    })

    const testProps = {
      theme: '郵便番号',
      props: '',
      registerProps: 'zipcode',
      rules: {
        required: '郵便番号は必須です',
      },
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <UserBuildingEditInput {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByTestId('postal-code-input')

    await act(async () => {
      fireEvent.change(input, { target: { value: '1234567' } })
    })

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://zipcloud.ibsnet.co.jp/api/search?zipcode=1234567',
      )
    })
  })

  it('郵便番号が無効または見つからない場合、エラーメッセージが表示されるべき', async () => {
    ;(axios.get as jest.Mock).mockResolvedValue({
      data: {
        results: [],
      },
    })

    const testProps = {
      theme: '郵便番号',
      props: '',
      registerProps: 'zipcode',
      rules: {
        required: '郵便番号は必須です',
      },
    }

    customRender(
      <TestWrapper testProps={testProps}>
        <UserBuildingEditInput {...testProps} />
      </TestWrapper>,
    )

    const input = screen.getByTestId('postal-code-input')

    await act(async () => {
      fireEvent.change(input, { target: { value: '0000000' } })
    })

    await waitFor(() => {
      expect(screen.queryByText(/住所を取得中.../)).not.toBeInTheDocument()
    })

    expect(screen.getByText(/住所の取得に失敗しました/i)).toBeInTheDocument()
    
    await waitFor(
      () => {
        expect(
          screen.queryByText(/住所の取得に失敗しました/i),
        ).not.toBeInTheDocument()
      },
      { timeout: 3500 },
    )
  })
})
