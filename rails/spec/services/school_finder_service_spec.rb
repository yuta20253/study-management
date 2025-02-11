require "rails_helper"

RSpec.describe SchoolFinderService, type: :service do
  let(:universities_data) do
    [
      {
        "uni" => {
          "school" => "北海道大学",
          "code" => 10000,
          "data" => [
            { "code" => 10000 },
          ],
        },
      },
      {
        "uni" => {
          "school" => "東北大学",
          "code" => 10001,
          "data" => [
            { "code" => 10001 },
          ],
        },
      },
    ]
  end

  describe "#find_university" do
    context "クエリが無効な場合" do
      let(:invalid_query) { "aaaaa" }
      it "「リクエストが無効です」と「bad_request」が返る" do
        service = SchoolFinderService.new(invalid_query, universities_data)
        result = service.find_university
        expect(result[:error]).to eq "リクエストが無効です"
        expect(result[:status]).to eq(:bad_request)
      end
    end

    context "学校IDが無効な場合" do
      let(:invalid_school_id) { 99999 }
      it "「大学が見つかりません」と「not_found」が返る" do
        service = SchoolFinderService.new(invalid_school_id, universities_data)
        result = service.find_university
        expect(result[:error]).to eq "大学が見つかりません"
        expect(result[:status]).to eq(:not_found)
      end
    end

    context "大学が見つからない場合" do
      let(:no_existing_id) { 20000 }
      it "「大学が見つかりません」と「not_found」が返る" do
        service = SchoolFinderService.new(no_existing_id, universities_data)
        result = service.find_university

        expect(result[:error]).to eq "大学が見つかりません"
        expect(result[:status]).to eq(:not_found)
      end
    end
  end
end
