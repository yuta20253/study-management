require "rails_helper"

RSpec.describe User, type: :model do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  context "factoryのデフォルト設定に従った場合" do
    it "認証済みの user レコードを正常に新規作成できる" do
      expect(user).to be_valid
      expect(user).to be_confirmed
    end
  end

  describe "association" do
    it { is_expected.to have_one(:address).dependent(:destroy) }
    it { is_expected.to have_one(:telephone).dependent(:destroy) }
    it { is_expected.to have_many(:todos).dependent(:destroy) }
    it { is_expected.to have_many(:study_hours).through(:todos) }
    it { is_expected.to have_many(:aspirations).dependent(:destroy) }
    it { is_expected.to have_many(:desired_schools).through(:aspirations) }
    it { is_expected.to have_many(:followers).class_name("RelationShip").with_foreign_key("follower_id").dependent(:destroy) }
    it { is_expected.to have_many(:followeds).class_name("RelationShip").with_foreign_key("followed_id").dependent(:destroy) }
    it { is_expected.to have_many(:following_users).through(:followers).source(:followed) }
    it { is_expected.to have_many(:follower_users).through(:followeds).source(:follower) }
  end

  describe "validation" do
    it { is_expected.to validate_presence_of :family_name }
    it { is_expected.to validate_presence_of :given_name }
    it { is_expected.to validate_presence_of :family_name_kana }
    it { is_expected.to validate_presence_of :given_name_kana }
  end

  describe "follow/unfollow" do
    it "フォローできる" do
      expect(user.following_users.count).to eq 0
      user.follow(other_user.id)
      expect(user.following_users.count).to eq 1
    end

    it "フォローできない" do
      user.follow(other_user.id)
      expect(user.following(other_user)).to be(true)
      user.unfollow(other_user.id)
      expect(user.following(other_user)).to be(false)
    end
  end
end
