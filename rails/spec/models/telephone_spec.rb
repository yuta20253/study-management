require "rails_helper"

RSpec.describe Telephone, type: :model do
  let(:current_user) { create(:user) }
  let(:telephone) { build(:telephone, user: current_user) }
  describe "validation" do
    context "phone_numberのテスト" do
      it "phone_numberのバリデーションが機能すること" do
        telephone = build(:telephone, user: current_user, phone_number: nil)
        expect(telephone).not_to be_valid
        expect(telephone.errors[:phone_number]).to include("を入力してください")
      end

      it "phone_numberが空の場合、無効であること" do
        telephone.phone_number = ""
        expect(telephone).not_to be_valid
        expect(telephone.errors[:phone_number]).to include("を入力してください")
      end
    end

    it "phone_numberの正規化のテスト" do
      telephone.phone_number = "090-1234-5678"
      expect(telephone).to be_valid
    end
  end

  describe "association" do
    it { is_expected.to belong_to :user }
  end
end
