require "rails_helper"

RSpec.describe ChatRoomsService, type: :service do
  subject { ChatRoomsService.new(current_user) }

  let(:current_user) { create(:user) }
  let(:other_user) { create(:user) }
  let!(:chat_room) { create(:room) }
  let!(:message) { create(:message, user: other_user, room: chat_room, content: "Hello, World!") }

  before do
    chat_room.users << current_user
    chat_room.users << other_user
  end

  describe "#call" do
    it "chat_roomの内容(chat_room、other_user、last_message)が返される" do
      result = subject.call

      expect(result[:rooms]).to be_an(Array)
      expect(result[:rooms].first).to have_key(:chat_room)
      expect(result[:rooms].first).to have_key(:other_user)
      expect(result[:rooms].first).to have_key(:last_message)

      chat_room_data = result[:rooms].first[:chat_room]
      expect(chat_room_data).to include("id" => chat_room.id)

      other_user_data = result[:rooms].first[:other_user]
      expect(other_user_data).to include("id" => other_user.id)

      last_mmessage_data = result[:rooms].first[:last_message]
      expect(last_mmessage_data).to include("content" => "Hello, World!")
    end

    it "全Userが返される" do
      result = subject.call
      expect(result[:users]).to be_an(Array)
      expect(result[:users].first).to have_key("id")
    end

    it "current_userが参加しているチャットルームのみが返される" do
      result = subject.call
      room_ids = result[:rooms].map {|room| room[:chat_room]["id"] }
      expect(room_ids).to include(chat_room.id)
    end
  end
end
