
class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_for connection.current_user
    broadcast_to(connection.current_user, {"message": "Connected!"})
  end
end