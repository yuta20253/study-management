require "rails_helper"

RSpec.describe StudyHour, type: :model do
  let(:todo) { create(:todo) }
  let(:study_hour) { create(:study_hour, todo:) }
  context "Todo作成時" do
    it "study_hourが一つ存在する" do
      expect(todo.study_hours.size).to eq(1)
    end
  end

  context "factoryのデフォルト設定に従った時" do
    it "正常にレコードを新規作成できる" do
      expect { study_hour }.to change { StudyHour.count }.by(2)
    end
  end

  describe "validation" do
    context "titleのテスト" do
      it { is_expected.to validate_presence_of :title }
    end

    context "todo_idのテスト" do
      it { is_expected.to validate_presence_of :todo_id }
    end

    context "subjectのテスト" do
      it { is_expected.to validate_presence_of :subject }
    end

    context "study_typeのテスト" do
      it { is_expected.to validate_presence_of :study_type }
    end

    context "actual_learning_timeのテスト" do
      it { is_expected.to validate_length_of(:actual_learning_time).is_at_least(0) }
    end
  end

  describe "study_typeのenumのテスト" do
    it { is_expected.to define_enum_for(:study_type).with_values(preparation: 0, lesson: 10, review: 20) }
  end

  describe "association" do
    it { is_expected.to belong_to(:todo) }
    it { is_expected.to have_one(:user) }
  end

  describe "scope" do
    describe "except_first_study_hours" do
      subject { StudyHour.except_first_study_hours }

      let(:study_hour) { create(:study_hour, actual_learning_time: 5) }

      it { is_expected.to include study_hour }
    end
  end
end
