require "rails_helper"

RSpec.describe "Api::V1::Current::Todos", type: :request do
  describe "GET api/v1/current/todos" do
    subject { get(api_v1_current_todos_path, headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let!(:todos) { create_list(:todo, 100, user: current_user) }

    describe "#index ヘッダー情報が正常に送られた時" do
      it "正常にレコードを取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["todos", "meta"]
        expect(todos.size).to eq 100
        expect(current_user.todos.size).to eq 100
        expect(response).to have_http_status(:ok)
      end
    end

    context "ヘッダー情報が空のままリクエストが送信された時" do
      let(:headers) { nil }
      it "unauthorized エラーが返る" do
        subject
        res = JSON.parse(response.body)
        expect(res["errors"]).to eq ["ログインもしくはアカウント登録してください。"]
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "ページネーションが機能している場合" do
      let(:page) { 1 }
      it "1ページ目が正しく返される" do
        subject
        res = JSON.parse(response.body)
        expect(res["todos"].size).to eq 5
        expect(res["meta"]["total_pages"]).to eq 20
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET api/v1/current/todos/:id" do
    subject { get(api_v1_current_todo_path(todo.id), headers:) }

    let(:current_user) { create(:user) }
    let(:todo) { create(:todo, user: current_user) }
    let(:headers) { current_user.create_new_auth_token }

    describe "#show" do
      it "レスポンスデータのtitleが一致" do
        subject
        res = JSON.parse(response.body)
        expect(res["title"]).to eq todo.title
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET api/v1/current/todos/:id/edit" do
    subject { get(edit_api_v1_current_todo_path(todo.id), headers:) }

    let(:current_user) { create(:user) }
    let(:todo) { create(:todo, user: current_user) }
    let(:headers) { current_user.create_new_auth_token }

    context "レスポンスデータのtitleが一致" do
      it "正しいレスポンスが返る" do
        subject
        res = JSON.parse(response.body)
        expect(res["title"]).to eq todo.title
      end
    end

    it "Todoの詳細が返される" do
      subject
      res = JSON.parse(response.body)
      expect(res["title"]).to eq todo.title
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST api/v1/current/todos" do
    subject { post(api_v1_current_todos_path, headers:, params:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:params) {
      { todo: FactoryBot.attributes_for(:todo, title: "ワンピース", subject: "英語", description: "", progress: :incomplete, scheduled_study_time: 10, due_date: nil,
                                               importance: :medium, star_rating: 0, total_hour: 0, study_type: :preparation, user: current_user) }
    }
    context "有効な値の時" do
      it "todoのtitleがparamsと一致する" do
        subject
        res = JSON.parse(response.body)
        expect(res["title"]).to eq "ワンピース"
      end

      it "Todoが正常に作成される" do
        expect { subject }.to change { current_user.todos.count }.by(1)
        res = JSON.parse(response.body)
        expect(res["title"]).to eq "ワンピース"
        expect(response).to have_http_status(:created) # 成功時に201 Createdが返されることを確認
      end

      it "study_hourが1つ作られる" do
        expect { subject }.to change { StudyHour.count }.by(1)
      end
    end

    context "無効な値の時" do
      let(:params) {
        { todo: FactoryBot.attributes_for(:todo, title: "", subject: "英語", description: "", progress: :incomplete, scheduled_study_time: 10, due_date: nil,
                                                 importance: :medium, star_rating: 0, total_hour: 0, study_type: :preparation, user: current_user) }
      }

      it "400エラーが返る" do
        subject
        res = JSON.parse(response.body)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(res["error"]).to include("タイトルを入力してください") # バリデーションエラーメッセージが含まれていることを確認
      end
    end
  end

  describe "DELETE api/v1/current/todos/:id" do
    subject { delete(api_v1_current_todo_path(todo.id), headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let!(:todo) { create(:todo, user: current_user) } # let! で todo を事前に作成

    context "Todoが存在する場合" do
      it "Todoを削除できる" do
        # 削除前のTodoの数を確認し、削除後の数が1減少することを確認
        expect { subject }.to change { current_user.todos.count }.by(-1)
        expect(response).to have_http_status(:no_content) # 成功時に204 No Contentが返されることを確認
      end
    end

    context "Todoが存在しない場合" do
      let(:todo) { instance_double(Todo, id: 999) } # モックで存在しないtodoを設定

      it "404エラーが返る" do
        subject
        res = JSON.parse(response.body)
        expect(response).to have_http_status(:not_found) # 404エラーが返されることを確認
        expect(res["error"]).to eq "Todo not found" # エラーメッセージが正しいことを確認
      end
    end
  end

  describe "GET api/v1/current/todos with invalid page" do
    subject { get(api_v1_current_todos_path(page:), headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let!(:todos) { create_list(:todo, 100, user: current_user) }

    context "無効なページ番号の場合" do
      let(:page) { 999 }

      it "空のレスポンスが返る" do
        subject
        res = JSON.parse(response.body)
        expect(res["todos"]).to be_empty
        expect(response).to have_http_status(:ok)
      end
    end

    context "ページが1ページ目の時" do
      let(:page) { 1 }

      it "最初のページが返る" do
        subject
        res = JSON.parse(response.body)
        expect(res["todos"].size).to eq 5
        expect(res["meta"]["total_pages"]).to eq 20
      end
    end
  end
end
