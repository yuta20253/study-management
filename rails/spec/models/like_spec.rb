require "rails_helper"

RSpec.describe Like, type: :model do
  let(:current_user) { create(:user) }
  let(:other_user) { create(:user) }

  describe "association" do
    it { is_expected.to belong_to(:from_user).class_name("User").with_foreign_key(:from_user_id) }
    it { is_expected.to belong_to(:to_user).class_name("User").with_foreign_key(:to_user_id) }
  end

  describe "scope" do
    let!(:like1) { create(:like, from_user: current_user, to_user: other_user) }
    let!(:like2) { create(:like, from_user: other_user, to_user: current_user) }
    describe "for_users" do
      it "特定のユーザーに対して正しいLikeを返す" do
        expect(Like.for_users(current_user, other_user)).to eq([like1])
        expect(Like.for_users(other_user, current_user)).to eq([like2])
      end
    end
  end
end
