class Telephone < ApplicationRecord
  include StringNormalizer

  belongs_to :user

  before_validation do
    self.phone_number = normalize_as_phone_number(phone_number)
    self.landline_phone_number = normalize_as_phone_number(landline_phone_number)
  end

  VALID_PHONE_NUMBER_REGEX = /\A0\d{1,4}-\d{1,4}-\d{4}\z/
  validates :phone_number, presence: true, format: { with: VALID_PHONE_NUMBER_REGEX }
  validates :landline_phone_number, presence: true, format: { with: VALID_PHONE_NUMBER_REGEX }
end
