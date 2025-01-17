require "rails_helper"

RSpec.describe "Api::V1::Current::Users", type: :request do
  describe "GET api/v1/current/user" do
    subject { get(api_v1_current_user_path, headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:todos) { create_list(:todo, 100, user: current_user) }
    context "ヘッダー情報が正常に送られた時" do
      it "正常にレコードを取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "family_name", "family_name_kana", "given_name", "given_name_kana", "age", "gender", "birthday", "email", "password",
                                "address", "telephone", "followers", "followeds"]
        expect(response).to have_http_status(:ok)
        expect(res["family_name"]).to eq current_user.family_name
        expect(todos.size).to eq 100
        puts "##########"
        puts current_user.todos.size
      end
    end

    context "ヘッダー情報が空のままリクエストが送信された時" do
      let(:headers) { nil }
      it "unauthorized エラーが返る" do
        subject { get(api_v1_current_user_path, headers:) }

        res = JSON.parse(response.body)
        expect(res["errors"]).to eq ["ログインもしくはアカウント登録してください。"]
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET api/v1/current/user" do
    subject { get(edit_api_v1_current_user_path, headers:) }

    let(:current_user) { create(:user) }
    let(:address) { create(:address, user: current_user) }
    let(:telephone) { create(:telephone, user: current_user) }
    let(:headers) { current_user.create_new_auth_token }
    describe "#edit" do
      it "レスポンスデータの名前がcurrent_userと一致" do
        subject
        res = JSON.parse(response.body)
        puts telephone.phone_number
        expect(res["family_name"]).to eq current_user.family_name
        expect(res["given_name"]).to eq current_user.given_name
      end
    end
  end
end
