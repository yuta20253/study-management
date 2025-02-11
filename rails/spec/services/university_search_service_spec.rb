require "rails_helper"

RSpec.describe UniversitySearchService, type: :service do
  describe "#call" do
    subject { UniversitySearchService.new(universities_data).call }

    let(:universities_data) do
      [
        [
          {
            "uni" => {
              "data" => [
                { "division": "国立", "code": 10000, "faculty_of_code": 10000, "region": "北海道・東北", "undergraduate_system": "文・人文", "department_system": "文化・教養", "university": "北海道", "faculty": "文学", "department": "人文科学", "deviation_value": 60.0 },
                { "division": "国立", "code": 10000, "faculty_of_code": 10001, "region": "北海道・東北", "undergraduate_system": "文・人文", "department_system": "教育", "university": "北海道", "faculty": "教育", "department": "教育", "deviation_value": 60.0 },
              ],
            },
          },
          {
            "uni" => {
              "data" => [
                { "division": "国立", "code": 10001, "faculty_of_code": 10031, "region": "北海道・東北", "undergraduate_system": "文・人文", "department_system": "文化・教養", "university": "東北", "faculty": "文", "department": "人文社会", "deviation_value": 62.5 },
                { "division": "国立", "code": 10001, "faculty_of_code": 10032, "region": "北海道・東北", "undergraduate_system": "文・人文", "department_system": "教育", "university": "東北", "faculty": "教育", "department": "教育科", "deviation_value": 62.5 },
              ],
            },
          },
        ],
      ]
    end

    it "フラットな大学の配列を返すこと" do
      result = subject
      expect(result).to eq([
        { "division": "国立", "code": 10000, "faculty_of_code": 10000, "region": "北海道・東北", "undergraduate_system": "文・人文", "department_system": "文化・教養", "university": "北海道", "faculty": "文学", "department": "人文科学", "deviation_value": 60.0 },
        { "division": "国立", "code": 10000, "faculty_of_code": 10001, "region": "北海道・東北", "undergraduate_system": "文・人文", "department_system": "教育", "university": "北海道", "faculty": "教育", "department": "教育", "deviation_value": 60.0 },
        { "division": "国立", "code": 10001, "faculty_of_code": 10031, "region": "北海道・東北", "undergraduate_system": "文・人文", "department_system": "文化・教養", "university": "東北", "faculty": "文", "department": "人文社会", "deviation_value": 62.5 },
        { "division": "国立", "code": 10001, "faculty_of_code": 10032, "region": "北海道・東北", "undergraduate_system": "文・人文", "department_system": "教育", "university": "東北", "faculty": "教育", "department": "教育科", "deviation_value": 62.5 },
      ])
    end

    it "返される大学の数が正しいこと" do
      result = subject
      expect(result.count).to eq(4)
    end
  end
end
