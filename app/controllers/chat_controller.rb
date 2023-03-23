class ChatController < ApplicationController
  def completion
    permitted_params = params.permit(:message, :chatId)
    if (chatId = params[:chatId])
      chat = current_user.chats.find(chatId)
    else
      chat = current_user.chats.create!
    end
    alpaca = Alpaca.new(current_user, chat.messages)
    time_sent = Time.now
    answer = alpaca.complete(permitted_params[:message])
    chat.messages << {text: permitted_params[:message], user: "USER", time: time_sent};
    chat.messages << {text: answer, user: "MODEL", time: Time.now};
    chat.save
    render json: {chatId: chat.id}
  end

  def index
  end
end

