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

// axiosの呼び出しをモック化して、実際のAPIリクエストを避ける
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

    // fireEvent.changeをactでラップ
    await act(async () => {
      fireEvent.change(input, { target: { value: '1234567' } })
    })

    // 入力値が正しく反映されていることを確認
    expect(input).toHaveValue('1234567')
  })

  it('有効な郵便番号が入力された場合、住所フィールドが自動補完されるべき', async () => {
    // axiosのレスポンスをモック化し、正常な結果を返す
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

    // 7桁の郵便番号を入力し、住所の自動補完を開始
    await act(async () => {
      fireEvent.change(input, { target: { value: '1234567' } })
    })

    // axiosの呼び出しが行われたことを確認
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://zipcloud.ibsnet.co.jp/api/search?zipcode=1234567',
      )
    })

    // 自動補完された住所がフォームにセットされていることを確認
    // ここで実際にフォームの入力フィールド（住所関連）にdata-testidを追加して検証する必要があります
  })

  it('郵便番号が無効または見つからない場合、エラーメッセージが表示されるべき', async () => {
    // axiosのレスポンスをモック化してエラーシナリオをシミュレート
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

    // 無効な郵便番号を入力して、エラーメッセージを表示
    await act(async () => {
      fireEvent.change(input, { target: { value: '0000000' } })
    })

    // ローディングが終了した後、エラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.queryByText(/住所を取得中.../)).not.toBeInTheDocument()
    })

    // エラーメッセージが表示されることを確認
    expect(screen.getByText(/住所の取得に失敗しました/i)).toBeInTheDocument()

    // エラーメッセージが時間経過後に非表示になることを確認
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
