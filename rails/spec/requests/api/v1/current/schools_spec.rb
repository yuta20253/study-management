require "rails_helper"

RSpec.describe "Api::V1::Current::Schools", type: :request do
  describe "GET api/v1/current/schools/:school_id/details/:id" do
    subject { get(api_v1_current_school_detail_path(school_id: "10225", id: "20001"), headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:desired_schools_hash) { JSON.parse(file_fixture("university.tsx").read) }

    it "HTTPステータス200を返し、正しい大学情報を取得できる" do
      subject
      expect(response).to have_http_status(:ok)

      universities_data = desired_schools_hash

      university_data_list = universities_data.flat_map do |data|
        data["uni"]["data"]
      end

      query = "20001"

      matching_university = university_data_list.find do |university|
        university["code"].to_s == query
      end

      expect(matching_university).not_to be_nil
      expect(matching_university["university"]).to eq "早稲田"
    end

    context "ユーザーが認証されていない場合" do
      let(:headers) { {} }

      it "401エラー（未認証）が返される" do
        subject
        expect(response).to have_http_status(:unauthorized)
        res = JSON.parse(response.body)
        expect(res["errors"]).to include("ログインもしくはアカウント登録してください。")
      end
    end
  end
end
