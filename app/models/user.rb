class User < ApplicationRecord
  has_secure_password

  has_many :chats, inverse_of: :user
end