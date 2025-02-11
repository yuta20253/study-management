require "rails_helper"

RSpec.describe Room, type: :model do
  let(:i) { create(:user) }
  let(:you) { create(:user) }
  let(:room_first) { create(:room) }
  let(:room_second) { create(:room) }
  let(:like_params) { { from_user_id: i.id, to_user_id: you.id } }

  before do
    create(:room_user, room: room_first, user: i)
    create(:room_user, room: room_second, user: you)
  end

  describe "association" do
    it { is_expected.to have_many(:room_users) }
    it { is_expected.to have_many(:users).through(:room_users) }
    it { is_expected.to have_many(:messages).dependent(:destroy) }
  end

  describe "scope" do
    describe ".for_user" do
      before do
        create(:room_user, room: room_first, user: i)
        create(:room_user, room: room_second, user: you)
      end

      it "ユーザーが参加している部屋を返す" do
        room_ids = Room.for_user(i).pluck(:id)
        expect(room_ids).to include(room_first.id)
        expect(room_ids).not_to include(room_second.id)

        room_ids_you = Room.for_user(you).pluck(:id)
        expect(room_ids_you).to include(room_second.id)
        expect(room_ids_you).not_to include(room_first.id)
      end

      it "ユーザーが参加していない部屋は返されない" do
        room_ids = Room.for_user(i).pluck(:id)
        expect(room_ids).not_to include(room_second.id)
      end
    end
  end

  context "Likeが正常に作成される場合" do
    let(:like_double) do
      instance_double(Like,
                      save: true,
                      new_record?: true,
                      from_user: i,
                      to_user: you,
                      from_user_id: i.id,
                      to_user_id: you.id)
    end
    before do
      allow(Like).to receive_messages(find_or_initialize_by: like_double, for_users: class_double(Like, exists?: true))
    end

    it "新しいチャットルームが作成される" do
      result = Room.create_chat_room(i, like_params)

      expect(result[:status]).to eq(:ok)
      expect(result[:chat_room]).to be_a(Room)
    end

    it "ユーザーがチャットルームに追加される" do
      result = Room.create_chat_room(i, like_params)

      chat_room = result[:chat_room]
      room_users = RoomUser.where(room_id: chat_room.id).pluck(:user_id)

      expect(room_users).to include(i.id, you.id)
    end
  end

  context "Likeが保存できない場合" do
    let(:like_double) { instance_double(Like, save: false, new_record?: true) }
    before do
      allow(Like).to receive(:find_or_initialize_by).and_return(like_double)
    end

    it "エラーが返される" do
      result = Room.create_chat_room(i, like_params)
      expect(result[:status]).to eq(:internal_server_error)
      expect(result[:message]).to eq("予期しないエラーが発生しました")
    end
  end

  context "相手がLikeしていない場合" do
    let(:like_double) do
      instance_double(Like, save: true, new_record?: true, from_user: i, to_user: you, from_user_id: i.id, to_user_id: you.id)
    end
    before do
      allow(Like).to receive_messages(find_or_initialize_by: like_double, for_users: class_double(Like, exists?: false))
    end

    it "エラーが返される" do
      result = Room.create_chat_room(i, like_params)

      expect(result[:status]).to eq(:bad_request)
      expect(result[:message]).to eq("相手がまだあなたをLikeしていません")
    end
  end

  context "RoomUserの作成に失敗する場合" do
    let(:like_double) do
      instance_double(Like,
                      save: true,
                      new_record?: true,
                      from_user: i,
                      to_user: you,
                      from_user_id: i.id,
                      to_user_id: you.id)
    end

    before do
      allow(Like).to receive_messages(find_or_initialize_by: like_double, for_users: class_double(Like, exists?: true))
    end

    it "エラーメッセージが返される" do
      allow(RoomUser).to receive(:find_or_create_by!).and_raise(ActiveRecord::RecordInvalid.new(RoomUser.new))

      result = Room.create_chat_room(i, like_params)

      expect(result[:status]).to eq(:internal_server_error)
      expect(result[:message]).to include("チャットルームのユーザー追加に失敗しました")
    end
  end
end
