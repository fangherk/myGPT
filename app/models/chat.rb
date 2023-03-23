
class Chat < ApplicationRecord
  belongs_to :user, inverse_of: :chats
end