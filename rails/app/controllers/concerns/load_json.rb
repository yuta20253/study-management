require "json"
module LoadJson
  extend ActiveSupport::Concern

  included do
    def load_json(universities_data)
      File.open("#{Rails.public_path}/json/university.json") do |f|
        data = JSON.parse(f.read)
        universities_data << data
      end
    end
  end
end
