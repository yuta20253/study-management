require "rails_helper"

RSpec.describe Address, type: :model do
  let(:current_user) { create(:user) }
  let(:address) { create(:address, user: current_user) }
  describe "validation" do
    context "postal_codeのテスト" do
      it { is_expected.to validate_presence_of :postal_code }
    end

    it "postal_codeの正規化テスト" do
      expect(address.postal_code).to match(/\A\d{3}[-]?\d{4}\z/)
    end

    context "prefectureのテスト" do
      it { is_expected.to validate_presence_of :prefecture }
    end

    context "cityのテスト" do
      it { is_expected.to validate_presence_of :city }
    end

    context "address1のテスト" do
      it { is_expected.to validate_presence_of :address1 }
    end
  end

  describe "association" do
    it { is_expected.to belong_to :user }
  end
end
