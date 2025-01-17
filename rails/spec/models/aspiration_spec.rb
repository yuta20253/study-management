require "rails_helper"

RSpec.describe Aspiration, type: :model do
  let(:current_user) { create(:user) }
  let(:desired_school) { create(:desired_school) }

  # バリデーションのテスト
  describe "validation" do
    context "全ての属性が正常な場合" do
      let(:aspiration) { build(:aspiration, user: current_user, desired_school:) }

      it "正常に保存できる" do
        expect(aspiration).to be_valid
      end
    end

    context "userが欠けている時" do
      let(:aspiration) { build(:aspiration, user: nil, desired_school:) }

      it "userがないから保存できない" do
        expect(aspiration).to be_invalid
        expect(aspiration.errors[:user]).to include("を入力してください")
      end
    end

    context "desired_schoolが欠けている" do
      let(:aspiration) { build(:aspiration, user: current_user, desired_school: nil) }

      it "desired_schoolがないから保存できない" do
        expect(aspiration).to be_invalid
        expect(aspiration.errors[:desired_school]).to include("を入力してください")
      end
    end

    describe "association" do
      it { is_expected.to belong_to :user }
      it { is_expected.to belong_to :desired_school }
    end
  end
end
