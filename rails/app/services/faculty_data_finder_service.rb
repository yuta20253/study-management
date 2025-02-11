class FacultyDataFinderService
  def initialize(universities_data, id)
    @universities_data = universities_data
    @id = id.to_i
  end

  def call
    faculty_data = nil
    @universities_data.each do |university|
      Rails.logger.debug "university:::::#{university}"
      university.each do |univer|
        univer["uni"]["data"].each do |data|
          Rails.logger.debug "Checking faculty_of_code: #{data["faculty_of_code"].class}"
          Rails.logger.debug @id.class
          if data["faculty_of_code"] == @id
            faculty_data = data
            return faculty_data
          end
        end
      end
    end
    faculty_data
  end
end
