require "rails_helper"

RSpec.describe "Api::V1::Current::Rooms", type: :request do
  describe "GET api/v1/current/rooms index" do
    subject { get(api_v1_current_rooms_path, headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }

    describe "#index ヘッダー情報が正常に送られた時" do
      it "正常にレコードを取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(res["rooms"]).to be_an(Array)
        expect(res["users"]).to be_an(Array)
      end
    end
  end

  describe "GET api/v1/current/rooms/:id show" do
    subject { get(api_v1_current_room_path(id: room.id), headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }

    context "指定されたRoomが存在する場合" do
      let!(:room) { create(:room) }
      let(:messages) { create(:message, room:) }
      it "正常にレコードを取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(res["messages"]).to be_an(Array)
      end
    end

    context "指定されたRoomが存在しない場合" do
      subject { get(api_v1_current_room_path(id: "invalid"), headers:) }

      it "エラーメッセージ「Roomが見つかりません」" do
        subject
        res = JSON.parse(response.body)
        expect(response).to have_http_status(:not_found)
        expect(res["error"]).to eq "Roomが見つかりません"
      end
    end
  end

  describe "POST api/v1/current/rooms create" do
    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }

    context "自分が相手にLikeしているが、相手が自分をLikeしていない場合" do
      let(:other_user) { create(:user) }
      it "エラーメッセージ「相手がまだあなたをLikeしていません」" do
        like_params = { from_user_id: current_user.id, to_user_id: other_user.id }
        post(api_v1_current_rooms_path, headers:, params: { like: like_params })
        res = JSON.parse(response.body)
        expect(res["message"]).to eq "相手がまだあなたをLikeしていません"
      end
    end
  end
end
