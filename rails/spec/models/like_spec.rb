require "rails_helper"

RSpec.describe Like, type: :model do
  let(:current_user) { create(:user) }
  let(:other_user) { create(:user) }

  describe "association" do
    it { is_expected.to belong_to(:from_user).class_name("User") }
    it { is_expected.to belong_to(:to_user).class_name("User") }
  end

  describe "scope" do
    let!(:my_like) { create(:like, from_user: current_user, to_user: other_user) }
    let!(:other_user_like) { create(:like, from_user: other_user, to_user: current_user) }
    describe "for_users" do
      it "特定のユーザーに対して正しいLikeを返す" do
        expect(Like.for_users(current_user, other_user)).to eq([my_like])
        expect(Like.for_users(other_user, current_user)).to eq([other_user_like])
      end
    end
  end
end
