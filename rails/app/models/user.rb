# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
  include StringNormalizer

  enum gender: { male: 0, female: 1 }

  has_one :address, dependent: :destroy
  has_one :telephone, dependent: :destroy

  has_many :todos, dependent: :destroy
  has_many :study_hours, through: :todos
  has_many :aspirations, dependent: :destroy
  has_many :desired_schools, through: :aspirations

  has_many :likes_from, class_name: "Like", foreign_key: :from_user_id, dependent: :destroy, inverse_of: :from_user
  has_many :likes_to, class_name: "Like", foreign_key: :to_user_id, dependent: :destroy, inverse_of: :to_user
  has_many :active_likes, through: :likes_from, source: :to_user  # 自分からのいいね
  has_many :passive_likes, through: :likes_to, source: :from_user # 相手からのいいね

  has_many :room_users, dependent: :destroy
  has_many :rooms, through: :room_users
  has_many :messages, dependent: :destroy

  accepts_nested_attributes_for :address
  accepts_nested_attributes_for :telephone

  # accepts_nested_attributes_for :todos, allow_destroy: true
  before_validation do
    self.family_name = normalize_as_name(family_name)
    self.given_name = normalize_as_name(given_name)
    self.family_name_kana = normalize_as_furigana(family_name_kana)
    self.given_name_kana = normalize_as_furigana(given_name_kana)
    self.email = normalize_as_email(email)
  end

  KATAKANA_REGEXP = /\A[\p{katakana}\u{30fc}]+\z/

  with_options presence: true do
    validates :family_name, :given_name
    validates :family_name_kana, :given_name_kana, format: { with: KATAKANA_REGEXP }
    validates :birthday
    validates :gender
  end

  validate :not_after_today_birthday

  # フォローをした、されたの関係
  has_many :followers, class_name: "RelationShip", foreign_key: "follower_id", dependent: :destroy, inverse_of: :follower
  has_many :followeds, class_name: "RelationShip", foreign_key: "followed_id", dependent: :destroy, inverse_of: :followed

  # 一覧画面で使う
  has_many :following_users, through: :followers, source: :followed
  has_many :follower_users, through: :followeds, source: :follower

  # 　フォローしたときの処理
  def follow(user_id)
    followers.create(followed_id: user_id)
  end

  # 　フォローを外すときの処理
  def unfollow(user_id)
    followers.find_by(followed_id: user_id).destroy
  end

  # フォローしていればtrueを返す
  def following(user)
    following_users.include?(user)
  end

  private

    def not_after_today_birthday
      if birthday.present? && birthday > Time.zone.today
        errors.add(:birthday, "は今日より後の日付にできません")
      end
    end
end
