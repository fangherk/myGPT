
class UserChannel < ApplicationCable::Channel
  def subscribed
    reject
    stream_from "chat"
    ActionCable.server.broadcast("chat", { hello: "hello"})
  end
end