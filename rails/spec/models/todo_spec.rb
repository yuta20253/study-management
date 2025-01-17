require "rails_helper"

RSpec.describe Todo, type: :model do
  let(:todo) { create(:todo) }
  context "factoryのデフォルト設定に従った時" do
    it "正常にレコードを新規作成できる" do
      expect { todo }.to change { Todo.count }.by(1)
    end
  end

  describe "validations" do
    context "全ての値が正常な時" do
      it "検証が通る" do
        expect(subject).to be_truthy
      end
    end

    context "titleのテスト" do
      it { is_expected.to validate_presence_of :title }
    end

    context "user_idのテスト" do
      it { is_expected.to validate_presence_of :user_id }
    end

    context "descriptionのテスト" do
      it { is_expected.to validate_length_of(:description).is_at_least(1).allow_blank }
      it { is_expected.to validate_length_of(:description).is_at_most(200).allow_blank }
    end

    context "due_dateのテスト" do
      it "過去の日付は選択できない" do
        todo.due_date = 1.day.ago
        expect(todo).to be_invalid
        expect(todo.errors[:due_date]).to include("過去日は登録できません")
      end

      it "未来の日なら有効" do
        todo.due_date = 1.day.from_now
        expect(todo).to be_valid
      end
    end

    context "subjectのテスト" do
      it { is_expected.to validate_presence_of :subject }
    end

    describe "progressのテスト" do
      # let(:todo) { create(:todo) }
      context "一般ユーザーが正しいenum値を持つこと" do
        it "progressがincomplete" do
          expect(todo.progress).to eq("incomplete")
        end
      end
    end

    describe "importance" do
      let(:todo) { create(:todo, importance: 0) }
      it "importance属性の値がlow" do
        expect(todo.importance).to eq "low"
      end

      it "importance属性の値がmedium" do
        todo.importance = 10
        expect(todo.importance).to eq "medium"
      end

      it "importance属性の値がhigh" do
        todo.importance = 20
        expect(todo.importance).to eq "high"
      end
    end

    describe "study_type" do
      let(:todo) { create(:todo, study_type: 0) }
      it "study_type属性の値がpreparation" do
        expect(todo.study_type).to eq "preparation"
      end

      it "study_type属性の値がlesson" do
        todo.study_type = 10
        expect(todo.study_type).to eq "lesson"
      end

      it "study_type属性の値がreview" do
        todo.study_type = 20
        expect(todo.study_type).to eq "review"
      end
    end

    describe "star_ratingのテスト" do
      it { is_expected.to validate_presence_of :star_rating }
      it { is_expected.to validate_numericality_of(:star_rating).is_greater_than_or_equal_to(0) }
      it { is_expected.to validate_numericality_of(:star_rating).is_less_than_or_equal_to(5) }
    end
  end

  describe "association" do
    it { is_expected.to have_many(:study_hours).dependent(:destroy) }
    it { is_expected.to belong_to(:user) }
  end

  describe "accepts_nested_attributes_for" do
    it { is_expected.to accept_nested_attributes_for(:study_hours).allow_destroy(true).update_only(true) }
  end

  describe "enum" do
    it { is_expected.to define_enum_for(:progress).with_values(incomplete: 0, on_the_way: 10, complete: 20) }
    it { is_expected.to define_enum_for(:importance).with_values(low: 0, medium: 10, high: 20) }
    it { is_expected.to define_enum_for(:study_type).with_values(preparation: 0, lesson: 10, review: 20) }
  end
end
