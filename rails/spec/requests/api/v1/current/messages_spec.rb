require "rails_helper"

RSpec.describe "Api::V1::Current::Messages", type: :request do
  describe "POST api/v1/current/rooms/:room_id/messages create" do
    subject { post(api_v1_current_room_messages_path(room_id: room.id), headers:, params:) }

    let(:current_user) { create(:user) }
    let(:room) { create(:room) }
    let(:headers) { current_user.create_new_auth_token }
    let(:params) { { message: FactoryBot.attributes_for(:message, "content": "テストメッセージです") } }

    context "contentが含まれているとき" do
      before do
        subject
      end

      it "正常にメッセージを作成できる" do
        res = JSON.parse(response.body)
        expect(response).to have_http_status(:created)
        expect(res["content"]).to eq "テストメッセージです"
      end
    end

    context "contentが含まれていないとき" do
      let(:params) { { message: FactoryBot.attributes_for(:message, "content": "") } }
      before do
        subject
      end

      it "メッセージが作成されない" do
        res = JSON.parse(response.body)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(res["error"]).to include("Contentを入力してください")
      end
    end
  end
end
