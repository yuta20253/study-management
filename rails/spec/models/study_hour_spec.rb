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

    describe "within_one_day" do
      let!(:todo) { create(:todo) }
      let!(:study_hour_first) { create(:study_hour, todo:, actual_learning_time: 3, created_at: Time.zone.now - 5.hours) }
      let!(:study_hour_second) { create(:study_hour, todo:, actual_learning_time: 1, created_at: 4.days.ago) }
      let!(:study_hour_third) { create(:study_hour, todo:, actual_learning_time: 0, created_at: 3.days.ago) }
      let!(:study_hour_four) { create(:study_hour, todo:, actual_learning_time: 5, created_at: 1.week.ago) }
      let!(:study_hour_five) { create(:study_hour, todo:, actual_learning_time: 2, created_at: 1.month.ago) }
      it "1日以内のstudy_hourだけ返る" do
        result = StudyHour.within_one_day
        expect(result).to include(study_hour_first)
        expect(result).not_to include(study_hour_second, study_hour_third, study_hour_four, study_hour_five)
      end
    end

    describe "within_one_week" do
      let!(:todo) { create(:todo) }
      let!(:study_hour_first) { create(:study_hour, todo:, actual_learning_time: 3, created_at: Time.zone.now - 5.days) }
      let!(:study_hour_second) { create(:study_hour, todo:, actual_learning_time: 1, created_at: 10.days.ago) }
      let!(:study_hour_third) { create(:study_hour, todo:, actual_learning_time: 0, created_at: 8.days.ago) }
      let!(:study_hour_four) { create(:study_hour, todo:, actual_learning_time: 5, created_at: 2.weeks.ago) }
      let!(:study_hour_five) { create(:study_hour, todo:, actual_learning_time: 2, created_at: 1.month.ago) }
      it "1週間以内のstudy_hourだけ返る" do
        result = StudyHour.within_one_week
        expect(result).to include(study_hour_first)
        expect(result).not_to include(study_hour_second, study_hour_third, study_hour_four, study_hour_five)
      end
    end

    describe "within_one_month" do
      let!(:todo) { create(:todo) }
      let!(:study_hour_first) { create(:study_hour, todo:, actual_learning_time: 3, created_at: 10.days) }
      let!(:study_hour_second) { create(:study_hour, todo:, actual_learning_time: 1, created_at: 25.days.ago) }
      let!(:study_hour_third) { create(:study_hour, todo:, actual_learning_time: 0, created_at: 15.days.ago) }
      let!(:study_hour_four) { create(:study_hour, todo:, actual_learning_time: 5, created_at: 2.months.ago) }
      let!(:study_hour_five) { create(:study_hour, todo:, actual_learning_time: 2, created_at: 1.month.ago) }
      it "1ヶ月以内のstudy_hourだけ返る" do
        result = StudyHour.within_one_week
        expect(result).to include(study_hour_first)
        expect(result).not_to include(study_hour_second, study_hour_third, study_hour_four, study_hour_five)
      end
    end

    describe "total_hours_within_one_day" do
      let!(:study_hour_first) { create(:study_hour, todo:, actual_learning_time: 3, created_at: Time.zone.now - 5.hours) }
      let!(:study_hour_second) { create(:study_hour, todo:, actual_learning_time: 2, created_at: Time.zone.now - 5.hours) }
      let!(:study_hour_third) { create(:study_hour, todo:, actual_learning_time: 1, created_at: Time.zone.now - 1.day) }

      it "1日以内の合計学習時間を正しく計算" do
        total_hours = StudyHour.total_hours_within_one_day(1.day.ago)
        expect(total_hours).to eq(5)
      end
    end

    describe "total_hours_within_one_week" do
      let!(:study_hour_first) { create(:study_hour, todo:, actual_learning_time: 3, created_at: Time.zone.now - 5.days) }
      let!(:study_hour_second) { create(:study_hour, todo:, actual_learning_time: 1, created_at: Time.zone.now - 5.days) }
      let!(:study_hour_third) { create(:study_hour, todo:, actual_learning_time: 2, created_at: Time.zone.now - 3.days) }
      it "1週間以内の合計学習時間を正しく計算" do
        total_hours = StudyHour.total_hours_within_one_week(1.week.ago)
        expect(total_hours).to eq 6
      end
    end

    describe "total_hours_within_one_month" do
      let!(:study_hour_first) { create(:study_hour, todo:, actual_learning_time: 3, created_at: Time.zone.now - 15.days) }
      let!(:study_hour_second) { create(:study_hour, todo:, actual_learning_time: 1, created_at: Time.zone.now - 25.days) }
      let!(:study_hour_third) { create(:study_hour, todo:, actual_learning_time: 2, created_at: Time.zone.now - 10.days) }

      it "1ヶ月以内の合計学習時間を正しく計算" do
        total_hours = StudyHour.total_hours_within_one_month(1.month.ago)
        expect(total_hours).to eq(6)
      end
    end
  end
end
