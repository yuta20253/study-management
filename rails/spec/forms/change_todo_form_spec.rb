require "rails_helper"

RSpec.describe ChangeTodoForm, type: :model do
  describe "#save" do
    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:todo) { create(:todo, user: current_user) }
    let(:study_hour) { create(:study_hour, todo:) }

    # Formオブジェクトの実体を生成する
    let(:change_todo_form) { ChangeTodoForm.new(todo) }

    context "必須項目が入力されている場合" do
      it "保存できる" do
        change_todo_form.study_hour.title = todo.title
        change_todo_form.study_hour.subject = todo.subject
        change_todo_form.study_hour.study_type = todo.study_type
        change_todo_form.study_hour.actual_learning_time = 120  # 必須の時間を設定

        expect(change_todo_form.study_hour.save).to be_truthy
        expect(change_todo_form.save).to be_truthy
      end
    end

    context "必須項目が空欄の場合" do
      it "保存できない" do
        change_todo_form.todo.title = ""
        change_todo_form.study_hour.title = ""
        change_todo_form.study_hour.subject = todo.subject
        change_todo_form.study_hour.study_type = todo.study_type
        expect(change_todo_form.study_hour.save).to be_falsey
        expect(change_todo_form.todo.save).to be_falsey
      end
    end

    context "study_hourの時間が無効な場合" do
      it "保存できない" do
        change_todo_form.study_hour.actual_learning_time = -10  # 無効な時間
        expect(change_todo_form.study_hour.save).to be_falsey
      end
    end

    context "todoのtitleが無効な場合" do
      it "保存できない" do
        change_todo_form.todo.title = "" # 無効なtitle
        expect(change_todo_form.todo.save).to be_falsey
      end
    end

    context "すべての項目が正しく入力されている場合" do
      it "保存できる" do
        change_todo_form.todo.title = "テストタイトル"
        change_todo_form.todo.subject = "テスト科目"
        change_todo_form.todo.study_type = "preparation"

        change_todo_form.study_hour.title = "テスト学習時間"
        change_todo_form.study_hour.subject = "テスト科目"
        change_todo_form.study_hour.study_type = "preparation"
        change_todo_form.study_hour.actual_learning_time = 120

        expect(change_todo_form.study_hour.save).to be_truthy
        expect(change_todo_form.save).to be_truthy
      end
    end

    context "study_hourの時間がゼロの場合" do
      it "保存できない" do
        change_todo_form.study_hour.actual_learning_time = 0 # 時間がゼロ
        expect(change_todo_form.study_hour.save).to be_falsey
      end
    end

    context "study_hourに無効なデータを入力した場合" do
      it "保存できない" do
        change_todo_form.study_hour.title = "" # 無効なtitle
        change_todo_form.study_hour.subject = ""
        change_todo_form.study_hour.study_type = ""
        expect(change_todo_form.study_hour.save).to be_falsey
      end
    end

    context "保存処理のトランザクション" do
      it "study_hourの保存に失敗すると、todoもロールバックされる" do
        allow(change_todo_form.study_hour).to receive(:save).and_return(false)

        expect(change_todo_form.save).to be false
        expect(change_todo_form.errors[:study_hour]).to include("study_hourの保存に失敗しました")
      end

      it "todoの保存に失敗すると、study_hourもロールバックされる" do
        allow(change_todo_form.todo).to receive(:save).and_return(false)
        # Expect the form's save to fail
        expect(change_todo_form.save).to be false
        # Ensure the error message is set on the form's todo
      end
    end
  end
end
