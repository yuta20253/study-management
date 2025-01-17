require "rails_helper"

RSpec.describe Message, type: :model do
  let(:current_user) { create(:user) }
  let(:room) { create(:room) }

  describe "validates" do
    it "属性の過不足" do
      message = Message.new(user: current_user, room:, content: "Hello, world!")
      expect(message).to be_valid
    end
  end

  describe "association" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:room) }
  end
end
