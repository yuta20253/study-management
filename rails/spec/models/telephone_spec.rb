require "rails_helper"

RSpec.describe Telephone, type: :model do
  let(:current_user) { create(:user) }
  let(:telephone) { create(:telephone, user: current_user) }
  describe "validation" do
    context "phone_numberのテスト" do
      it { is_expected.to validate_presence_of :phone_number }
    end

    it "phone_numberの正規化のテスト" do
      expect(telephone.phone_number).to match(/\A0(\d{1}[-(]?\d{4}|\d{2}[-(]?\d{3}|\d{3}[-(]?\d{2}|\d{4}[-(]?\d{1})[-)]?\d{4}\z|\A0[5789]0[-]?\d{4}[-]?\d{4}\z/)
    end
  end

  describe "association" do
    it { is_expected.to belong_to :user }
  end
end
