class UserForm
  include ActiveModel::Model
  include ActiveModel::Validations::Callbacks
  include ActiveModel::Attributes
  include StringNormalizer

  attr_accessor :user

  attribute :family_name_kana, :string
  attribute :given_name_kana, :string
  attribute :family_name, :string
  attribute :given_name, :string
  attribute :age, :integer
  attribute :gender, :integer
  attribute :birthday, :date

  delegate :persist?, to: :user

  before_validation do
    self.family_name = normalize_as_name(family_name)
    self.given_name = normalize_as_name(given_name)
    self.family_name_kana = normalize_as_furigana(family_name_kana)
    self.given_name_kana = normalize_as_furigana(given_name_kana)
  end

  KATAKANA_REGEXP = /\A[\p{katakana}\u{30fc}]+\z/

  with_options presence: true do
    validates :family_name, :given_name
    validates :family_name_kana, :given_name_kana, format: { with: KATAKANA_REGEXP, allow_blank: true }
    # validates :email, 'valid_email_2/email': true, uniqueness: { case_sensitive: false }
  end
  POSTAL_CODE_REGEX = /\A\d{3}[-]?\d{4}\z/
  validates :postal_code, presence: true, format: { with: POSTAL_CODE_REGEX }
  validates :prefecture, presence: true
  validates :city, presence: true
  validates :address1, presence: true
  # validates :aspirations, length: { maximum: 5 }
  # validates_length_of :aspirations , maximum: 5

  def initialize(user = nil)
    @user = user
    @user ||= User.new(gender: "male")
    @user.build_address unless @user.address
    @user.build_telephone unless @user.telephone
  end

  def assign_attributes(params = {})
    @params = params

    user.assign_attributes(user_params)
    user.address.assign_attributes(address_params)
    user.telephone.assign_attributes(phone_params)
  end

  def save
    ActiveRecord::Base.transaction do
      unless user.save
        self.errors.add(:user, "ユーザーの保存に失敗しました")
        raise ActiveRecord::Rollback
      end

      unless user.address.save
        self.errors.add(:address, "住所の保存に失敗しました")
        raise ActiveRecord::Rollback
      end

      unless user.telephone.save
        self.errors.add(:telephone, "電話の保存に失敗しました")
        raise ActiveRecord::Rollback
      end
    end

    self.errors.empty?
  end

  private

    def user_params
      @params.require(:user).permit(:family_name_kana, :given_name_kana, :family_name, :given_name, :age, :gender, :id, :birthday,
                                    desired_school_ids: [])
    end

    def address_params
      @params.require(:address).permit(:prefecture, :city, :address1, :address2, :postal_code, :user_id, :id)
    end

    def phone_params
      @params.require(:telephone).permit(:phone_number, :landline_phone_number, :user_id, :id)
    end
end
