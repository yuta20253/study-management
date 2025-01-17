require "rails_helper"

RSpec.describe DesiredSchool, type: :model do
  let(:desired_school) { create(:desired_school) }
  context "factoryのデフォルト設定に従った時" do
    it "正常にレコードを新規作成できる" do
      expect { desired_school }.to change { DesiredSchool.count }.by(1)
      expect(desired_school).to be_valid
    end
  end

  describe "validation" do
    context "validationのテスト" do
      it { is_expected.to validate_presence_of :university }
      it { is_expected.to validate_presence_of :faculty }
      it { is_expected.to validate_presence_of(:department).allow_blank }
      it { is_expected.to validate_presence_of :deviation_value }
      it { is_expected.to validate_numericality_of(:deviation_value).is_greater_than_or_equal_to(35.0) }
      it { is_expected.to validate_numericality_of(:deviation_value).is_less_than_or_equal_to(75.0) }
      it { is_expected.to validate_presence_of :location }
      it { is_expected.to validate_presence_of :code }
      it { is_expected.to validate_presence_of :faculty_of_code }
      it { is_expected.to validate_presence_of :division }
      it { is_expected.to validate_presence_of :department_system }
      it { is_expected.to validate_presence_of :capacity }
      it { is_expected.to validate_presence_of :undergraduate_system }
    end
  end

  describe "association" do
    it { is_expected.to have_many(:aspirations).dependent(:destroy) }
    it { is_expected.to have_many(:users).through(:aspirations) }
  end
end
