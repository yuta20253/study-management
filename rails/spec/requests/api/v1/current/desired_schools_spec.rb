require "rails_helper"

RSpec.describe "Api::V1::Current::DesiredSchools", type: :request do
  describe "GET api/v1/current/desired_schools" do
    subject { get(api_v1_current_desired_schools_path, headers:) }

    let(:current_user) { create(:user, :user_with_five_desired_schools) }
    let(:headers) { current_user.create_new_auth_token }
    let(:desired_schools) { DesiredSchool.first }
    let(:desired_school_hash) { JSON.parse(file_fixture("university.tsx").read) }

    describe "#index ヘッダー情報が正常に送られた時" do
      it "正常にレコードを取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["universities", "universities_data"]
        expect(current_user.desired_schools.size).to eq 5
      end

      context "jsonファイル" do
        it "jsonファイルからデータを取得できる(適切な配列のインデックス0を指定)" do
          subject
          expect(desired_school_hash[0]["uni"]["school"]).to eq "北海道大学"
        end

        it "jsonファイルからデータを取得できない(適切な配列のインデックス1を指定)" do
          subject
          expect(desired_school_hash[1]["uni"]["school"]).not_to eq "北海道大学"
        end
      end
    end
  end

  describe "POST api_v1_current_desired_schools" do
    subject { post(api_v1_current_desired_schools_path, headers:, params:) }

    let(:user_with_four) { create(:user, :user_with_four_desired_schools) }
    let(:user_with_five) { create(:user, :user_with_five_desired_schools) }
    let(:headers) { user_with_four.create_new_auth_token }
    let(:desired_school) { create(:desired_school) }
    let(:params) {
      { desired_school: FactoryBot.attributes_for(:desired_school, "university": "法政", "faculty": "経営", "department": "経営", "deviation_value": 60.0,
                                                                   "location": "東京都千代田区富士見2－17－1", "region": "関東・甲信越", "department_system": "経営", "undergraduate_system": "経済・経営・商", "code": 20003, "faculty_of_code": 10295, "capacity": 326, "division": "私立") }
    }

    describe "#create Userが4校しか志望校をアソシエートしていない場合" do
      it "保存できる" do
        expect(user_with_four.desired_schools.length).to eq 4
        expect { subject }.to change { user_with_four.desired_schools.reload.length }.by(1)
      end
    end

    describe "#create Userがすでに5校の志望校をアソシエートしている場合" do
      it "保存できない" do
        expect(user_with_five.desired_schools.length).to eq 5
        expect { subject }.not_to change { user_with_five.desired_schools.reload.length }
      end
    end

    describe "#create データが正しく保存されるか" do
      it "志望校が保存される" do
        expect { subject }.to change { user_with_four.desired_schools.reload.length }.by(1)
        new_school = user_with_four.desired_schools.last
        expect(new_school.university).to eq "法政"
        expect(new_school.faculty).to eq "経営"
        expect(new_school.region).to eq "関東・甲信越"
      end
    end
  end

  describe "DELETE api/v1/current/desired_schools/:id" do
    subject { delete(api_v1_current_desired_school_path(desired_school.id), headers:) }

    let(:user_with_five) { create(:user, :user_with_five_desired_schools) }
    let(:headers) { user_with_five.create_new_auth_token }
    let(:desired_school) { DesiredSchool.first }

    context "idが存在する場合" do
      it "登録解除できる" do
        expect(user_with_five.desired_schools.length).to eq 5
        subject
        expect(user_with_five.desired_schools.reload.length).to eq 4
      end
    end
  end
end
