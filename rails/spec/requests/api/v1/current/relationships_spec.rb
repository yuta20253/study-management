require "rails_helper"

RSpec.describe "Api::V1::Current::Relationships", type: :request do
  let(:current_user) { create(:user) }
  let(:another_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }

  describe "show api/v1/current/user/relationships" do
    subject { get(api_v1_current_user_relationships_path, headers:) }

    it "現在のユーザーが他のユーザーを取得できるか" do
      subject
      users = JSON.parse(response.body)["users"]
      expect(users).to be_an(Array)
      expect(users.first).to have_key("id")
      expect(users.first).to have_key("family_name")
    end
  end

  describe "create api/v1/current/user/relationships/create" do
    subject { post(api_v1_current_user_relationships_path, headers:, params:) }

    let(:params) { { user_id: another_user.id } }

    before do
      current_user.follow(another_user.id)
    end

    context "ユーザーが他のユーザーをフォローできるか" do
      it "フォローができる" do
        expect { subject }.to change { current_user.following_users.count }.by(1)
        follow_user = JSON.parse(response.body)
        expect(follow_user["followed_id"]).to eq(another_user.id)
      end
    end
  end

  describe "destroy api/v1/current/user/relationships" do
    subject { delete(api_v1_current_user_relationships_path, headers:, params:) }

    let(:params) { { user_id: another_user.id } }

    before do
      current_user.follow(another_user.id)
    end

    context "ユーザーが他のユーザーをフォロー解除できるか" do
      it "フォロー解除できる" do
        expect { subject }.to change { current_user.following_users.count }.by(-1)
        unfollow_user = JSON.parse(response.body)
        expect(unfollow_user["followed_id"]).to eq(another_user.id)
      end
    end
  end

  describe "followings api/v1/current/user/followings" do
    subject { get(followings_api_v1_current_user_path, headers:) }

    let!(:user_to_follow) { create(:user) }

    before do
      current_user.follow(user_to_follow.id)
    end

    it "フォローしているユーザーのリストがかえる" do
      subject
      res = JSON.parse(response.body)
      expect(res).to be_an(Array)

      expect(res.first["family_name"]).to eq(user_to_follow.family_name)
    end
  end

  describe "followers api/v1/current/user/followers" do
    subject { get(followers_api_v1_current_user_path, headers:) }

    let!(:user_to_follow) { create(:user) }

    before do
      user_to_follow.follow(current_user.id)
    end

    it "フォローされているユーザーのリストがかえる" do
      subject
      res = JSON.parse(response.body)
      expect(res).to be_an(Array)

      expect(res.first["family_name"]).to eq(user_to_follow.family_name)
    end
  end
end
