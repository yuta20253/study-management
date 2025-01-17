require "rails_helper"

RSpec.describe "Api::V1::Current::DesiredSchools::SearchResults", type: :request do
  describe "GET api/v1/current/search_result" do
    subject { get(api_v1_current_search_result_index_path, headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:desired_schools_hash) { JSON.parse(file_fixture("university.tsx").read) }
    it "returns http success" do
      subject
      # puts "#{desired_schools_hash}"
      expect(response).to have_http_status(:success)

      universities_data = []
      universities_data << desired_schools_hash

      data_size = 0
      universities_data[0].count.times do |i|
        universities_data[0][i]["uni"]["data"].count.times do
          data_size += 1
        end
      end

      universities_arr = []

      # puts "要素数:::#{data_size}"
      universities_data[0].count.times do |i|
        universities_arr.push(universities_data[0][i]["uni"]["data"])
        universities_arr.flatten!
      end

      puts(universities_arr[0])
      puts(universities_arr[0]["university"])

      expect(universities_arr[0]["university"]).to eq "北海道"
    end
  end
end
