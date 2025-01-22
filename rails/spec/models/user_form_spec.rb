require "rails_helper"

RSpec.describe UserForm, type: :model do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }
  let(:address) { create(:address, user: current_user) }
  let(:telephone) { create(:telephone, user: current_user) }
  let(:headers) { current_user.create_new_auth_token }

  # Formオブジェクトの実体を生成する
  let(:user_form) { UserForm.new(current_user) }
  describe "#save" do
    context "必須項目が入力されている場合" do
      it "保存できる" do
        puts "#{address.prefecture}"
        puts "#{user_form.user.family_name}"
        puts "#{user_form.user.address.city}"
        #user_form.assign_attributes(attributes)
        expect(user_form.user.save).to be_truthy
        puts "#{user_form.user.family_name}"
      end
    end

    context "必須項目が入力漏れがある場合" do
      it "保存できない" do
        puts "#{user_form.user.family_name}"
        puts "#{user_form.user.address.prefecture}"
        user_form.user.family_name = ""
        puts "#{user_form.user.family_name}"
        #user_form.assign_attributes(attributes)
        user_form.user.reload
        expect(user_form.user.save).to be_falthy
        #expect(user_form.errors.full_messages).to include ("Column 'prefecture' cannot be null")
        puts "#{user_form.user.family_name}"
      end
    end
  end
end
