require "rails_helper"

RSpec.describe UserForm, type: :model do
  let(:current_user) { create(:user, :user_with_address_and_tel) }
  let(:headers) { current_user.create_new_auth_token }

  # Formオブジェクトの実体を生成する
  let(:user_form) { UserForm.new(current_user) }

  describe "#save" do
    context "必須項目が入力されている場合" do
      it "保存できる" do
        # 必須項目が入力されていることを確認
        expect(user_form.user.save).to be_truthy
      end
    end

    context "必須項目が入力漏れがある場合" do
      it "保存できない" do
        # 入力漏れを作成する
        user_form.user.address.prefecture = ""

        # 必須項目が欠けているため保存できないことを確認
        expect(user_form.user.save).to be_falsey
      end
    end

    context "メールアドレスが無効な場合" do
      it "保存できない" do
        # 無効なメールアドレスを設定
        user_form.user.email = "invalid_email"

        # 無効なメールアドレスでは保存できないことを確認
        expect(user_form.user.save).to be_falsey
      end
    end

    context "パスワードが短すぎる場合" do
      it "保存できない" do
        # パスワードを短く設定
        user_form.user.password = "short"

        # パスワードが短すぎると保存できないことを確認
        expect(user_form.user.save).to be_falsey
      end
    end

    context "電話番号が無効な場合" do
      it "保存できない" do
        # 無効な電話番号を設定
        user_form.user.telephone.phone_number = "12345"

        # 無効な電話番号では保存できないことを確認
        expect(user_form.user.save).to be_falsey
      end
    end

    context "すべての項目が正しく入力されている場合" do
      it "保存できる" do
        # すべての項目を正しく設定
        user_form.user.family_name = "山田"
        user_form.user.given_name = "太郎"
        user_form.user.family_name_kana = "ヤマダ"
        user_form.user.given_name_kana = "タロウ"
        user_form.user.gender = :male
        user_form.user.birthday = "1990-01-01"
        user_form.user.telephone.phone_number = "090-1234-5678"
        user_form.user.address.prefecture = "東京都"
        user_form.user.address.city = "渋谷区"

        # 保存が成功することを確認
        expect(user_form.user.save).to be_truthy
      end
    end

    context "assign_attributes メソッドのテスト" do
      it "userオブジェクトの属性が正しく更新される" do
        # Pass parameters inside the `user`, `address`, and `telephone` keys
        params = ActionController::Parameters.new(
          user: {
            family_name: "田中",
            given_name: "太郎",
            family_name_kana: "タナカ",
            given_name_kana: "タロウ",
            gender: "male",
            birthday: "1990-01-01",
          },
          address: {
            prefecture: "東京都",
            city: "渋谷区",
            address1: "渋谷1-1",
            postal_code: "150-0002",
          },
          telephone: {
            phone_number: "09012345678",
            landline_phone_number: "033-1234-5678",
          },
        )

        # Assign the parameters directly to user_form
        user_form.assign_attributes(params)

        # Check if the user object has the correct attributes
        expect(user_form.user.family_name).to eq "田中"
        expect(user_form.user.given_name).to eq "太郎"
        expect(user_form.user.family_name_kana).to eq "タナカ"
        expect(user_form.user.given_name_kana).to eq "タロウ"
        expect(user_form.user.gender).to eq "male"
        expect(user_form.user.birthday).to eq Date.parse("1990-01-01")

        # Check if the address object has the correct attributes
        expect(user_form.user.address.prefecture).to eq "東京都"
        expect(user_form.user.address.city).to eq "渋谷区"
        expect(user_form.user.address.address1).to eq "渋谷1-1"
        expect(user_form.user.address.postal_code).to eq "150-0002"

        # Check if the telephone object has the correct attributes
        expect(user_form.user.telephone.phone_number).to eq "09012345678"
        expect(user_form.user.telephone.landline_phone_number).to eq "033-1234-5678"
      end
    end

    context "assign_attributes メソッドで不正なパラメータが渡された場合" do
      it "住所の郵便番号が不正な場合、エラーが返される" do
        params = ActionController::Parameters.new(
          user: {
            family_name: "田中",
            given_name: "太郎",
            family_name_kana: "タナカ",
            given_name_kana: "タロウ",
            gender: "male",
            birthday: "1990-01-01",
          },
          address: {
            prefecture: "東京都",
            city: "渋谷区",
            address1: "渋谷1-1",
            postal_code: "abc-1234", # 不正な郵便番号
          },
          telephone: {
            phone_number: "09012345678",
            landline_phone_number: "033-1234-5678",
          },
        )

        user_form.assign_attributes(params)

        # Trigger validation
        user_form.user.address.valid?
        # 住所の郵便番号が不正な場合はエラーが出るはず
        expect(user_form.user.address.errors[:postal_code]).to include("郵便番号が無効です")
      end
    end

    context "保存処理のトランザクション" do
      it "user 保存に失敗すると、住所や電話番号もロールバックされる" do
        allow(user_form.user).to receive(:save).and_return(false) # user 保存失敗

        expect(user_form.save).to be false
        expect(user_form.errors[:user]).to include("ユーザーの保存に失敗しました") # エラーメッセージが追加されることを確認
      end

      it "住所保存に失敗した場合もロールバックされる" do
        allow(user_form.user.address).to receive(:save).and_return(false) # address 保存失敗

        expect(user_form.save).to be false
        expect(user_form.errors[:address]).to include("住所の保存に失敗しました")
      end

      it "電話番号保存に失敗した場合もロールバックされる" do
        allow(user_form.user.telephone).to receive(:save).and_return(false) # telephone 保存失敗

        expect(user_form.save).to be false
        expect(user_form.errors[:telephone]).to include("電話の保存に失敗しました")
      end
    end
  end
end
