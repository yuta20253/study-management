require "rails_helper"

RSpec.describe "Api::V1::Current::Follows", type: :request do
  let(:current_user) { create(:user) }
  let(:another_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }
  describe "show api/v1/current/follows/:id" do
    subject { get(api_v1_current_follow_path(another_user.id), headers:) }

    context "ユーザーが正常に存在する場合" do
      it "another_userのデータが返される" do
        subject
        res = JSON.parse(response.body)
        puts res
        expect(res["another_user"]["id"]).to eq(another_user.id)
        expect(res["another_user"]["family_name"]).to eq(another_user.family_name)
      end
    end

    context "ユーザーが存在しない場合" do
      subject { get(api_v1_current_follow_path(9999), headers:) }

      it "404 エラーが返される" do
        subject
        res = JSON.parse(response.body)
        expect(response).to have_http_status(:not_found)
        expect(res["error"]).to eq "Userが見つかりません"
      end
    end
  end
end
