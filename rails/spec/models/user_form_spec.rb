require "rails_helper"

RSpec.describe UserForm, type: :model do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }
  let(:address) { create(:address, user: current_user) }
  let(:telephone) { create(:telephone, user: current_user) }

  # Formオブジェクトの実体を生成する
  let(:user_form) { UserForm.new(current_user) }
  describe "#save" do
    context "必須項目が入力されている場合" do
      it "保存できる" do
        user_form.user.address = address
        user_form.user.telephone = telephone
        expect(user_form.user.save).to be_truthy, user_form.user.errors.full_messages.to_sentence
      end
    end

    context "必須項目が入力漏れがある場合" do
      it "保存できない" do
        user_form.user.family_name = ""

        expect(user_form.user.save).to be_falsey
      end
    end
  end
end
