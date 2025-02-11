class SchoolFinderService
  def initialize(query, universities_data)
    @query = query
    @universities_data = universities_data
  end

  def find_university
    query_id = paese_query
    return { error: "リクエストが無効です", status: :bad_request } unless query_id

    return { error: "大学が見つかりません", status: :not_found } unless valid_school_id?(query_id)

    university_data = search_university_code(query_id)
    return { error: "大学が見つかりません", status: :not_found } if university_data.nil?

    Rails.logger.debug "university_data: #{university_data}"
    university_data.deep_symbolize_keys!
    { university_data:, status: :ok }
  end

  private

    def paese_query
      Integer(@query)
    rescue
      nil
    end

    def valid_school_id?(school_id)
      Rails.logger.debug "大学コードが一致しているかの確認です"
      Rails.logger.debug "学校IDの確認: #{school_id}"
      school_id_str = school_id.to_s
      valid_ids = ["10000", "10001", "10002", "10003", "10004", "10005", "10006", "10007", "20001", "20002", "20003", "20004", "20005", "20006", "20007"]
      valid_ids.include?(school_id_str)
    end

    def search_university_code(query_id)
      @universities_data[0].each do |university_data|
        return nil if university_data.nil? || !university_data.is_a?(Hash)

        next unless university_data["uni"]

        if university_data["uni"]["code"].to_i == query_id.to_i
          return university_data
        end
      end
      nil
    end
end
