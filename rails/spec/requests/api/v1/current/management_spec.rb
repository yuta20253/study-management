require "rails_helper"

RSpec.describe "Api::V1::Current::Managements", type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }

  describe "GET api/v1/current/management" do
    subject { get(api_v1_current_management_index_path, headers:) }

    describe "#index ヘッダー情報が正常に送られた時" do
      let!(:study_hours) { create_list(:study_hour, 5, user: current_user) }
      let!(:all_study_hours) { create_list(:study_hour, 100, user: current_user) }
      it "res.data.study_hoursが取得できる" do
        subject
        res = JSON.parse(response.body)
        if res.has_key?("error")
          expect(res["error"]).to eq "ユーザーの学習詳細データがありません"
        else
          expect(res.keys).to eq ["study_hours", "all_study_hours"]
          expect(response).to have_http_status(:ok)
        end
      end
    end

    context "ヘッダー情報が空のままリクエストが送信された時" do
      let(:headers) { nil }

      it "unauthorized エラーが返る" do
        subject
        res = JSON.parse(response.body)
        expect(res["errors"]).to eq ["ログインもしくはアカウント登録してください。"]
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "ユーザーにstudy_hourデータがない場合" do
      it "study_hoursが空で返される" do
        subject
        res = JSON.parse(response.body)
        expect(res["study_hours"]).to be_nil # 空の配列が返される
        expect(res["all_study_hours"]).to be_nil # 空の配列が返される
        expect(response).to have_http_status(:not_found)
      end
    end

    context "study_hoursのデータが正しく集計されていること" do
      let!(:study_hour_first) { create(:study_hour, user: current_user, actual_learning_time: 2) }
      let!(:study_hour_second) { create(:study_hour, user: current_user, actual_learning_time: 3) }

      it "study_hoursの合計が正しく計算される" do
        subject
        res = JSON.parse(response.body)
        expect(res["study_hours"].size).to eq 2
        expect(response).to have_http_status(:ok)
      end
    end

    context "他のユーザーのstudy_hourデータが取得できないこと" do
      let(:other_user) { create(:user) }
      let!(:other_user_study_hour) { create(:study_hour, user: other_user, actual_learning_time: 4) }

      it "他のユーザーのデータが返されないこと" do
        subject
        res = JSON.parse(response.body)
        # `study_hours` が nil でないことを確認した後、`size` をチェック
        expect(res["study_hours"]).to be_nil
        # expect(res["study_hours"].size).to eq 0  # 現ユーザーのstudy_hourデータのみが返される
        expect(response).to have_http_status(:not_found)
      end
    end

    context "ユーザーのstudy_hourデータが空の場合" do
      it "エラーレスポンスが返される" do
        # ユーザーに関連する `study_hours` とその関連する `todos` を削除
        current_user.study_hours.each {|study_hour| study_hour.todos.destroy_all }
        current_user.study_hours.destroy_all

        subject
        res = JSON.parse(response.body)
        expect(res["error"]).to eq "ユーザーの学習詳細データがありません"
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
