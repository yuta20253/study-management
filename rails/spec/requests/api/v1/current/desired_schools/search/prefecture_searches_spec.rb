require "rails_helper"

RSpec.describe "Api::V1::Current::DesiredSchools::Search::PrefectureSearches", type: :request do
  describe "GET api/v1/current/desired_schools/search/prefecture_searches" do
    subject { get(api_v1_current_desired_schools_search_prefecture_searches_path, headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:desired_schools_hash) { JSON.parse(file_fixture("university.tsx").read) }
    it "returns http success" do
      subject
      expect(response).to have_http_status(:success)
      universities_data = []

      universities_data << desired_schools_hash
      data_size = 0 # jsonデータ内にあるdataの中の要素数
      universities_data[0].count.times do |i|
        universities_data[0][i]["uni"]["data"].count.times do
          data_size += 1
        end
      end

      universities_arr = []
      university_prefecture_Arr = []
      universities_name_arr = []
      universities = []

      # puts "要素数:::#{data_size}"
      universities_data[0].count.times do |i|
        universities_arr.push(universities_data[0][i]["uni"]["data"])
        university_prefecture_Arr.push(universities_data[0][i]["uni"]["prefecture"])
        universities_name_arr.push(universities_data[0][i]["uni"]["school"])
        universities.push(universities_data[0][i]["uni"])
        universities_arr.flatten!
      end
      puts(universities[0]["school"])
      expect(universities[0]["school"]).to eq "北海道大学"
    end
  end
end
