class UniversitySearchService
  def initialize(universities_data)
    @universities_data = universities_data
  end

  def call
    universities_arr = []
    data_size = 0
    @universities_data[0].count.times do |i|
      @universities_data[0][i]["uni"]["data"].count.times do
        data_size += 1
      end
    end

    # puts "要素数:::#{data_size}"
    @universities_data[0].count.times do |i|
      universities_arr.push(@universities_data[0][i]["uni"]["data"])
      universities_arr.flatten!
    end
    # Rails.logger.debug universities_arr.to_s

    # puts "#{universities_arr}"
    universities_arr
  end
end
