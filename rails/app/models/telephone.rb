class Telephone < ApplicationRecord
  include StringNormalizer

  belongs_to :user

  before_validation do
    self.phone_number = normalize_as_phone_number(phone_number)
    self.landline_phone_number = normalize_as_phone_number(landline_phone_number)
  end

  VALID_PHONE_NUMBER_REGEX = /\A0\d{1,4}-\d{1,4}-\d{4}\z/
  validates :phone_number, presence: true, format: { with: VALID_PHONE_NUMBER_REGEX }, allow_blank: true
  validates :landline_phone_number, presence: true, format: { with: VALID_PHONE_NUMBER_REGEX }, allow_blank: true

  private

    def at_least_one_telephone_present
      if phone_number.blank? && landline_phone_number.blank?
        errors.add(:base, "電話番号を入力してください")
      end
    end
end
