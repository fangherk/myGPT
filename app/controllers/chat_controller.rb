class ChatController < ApplicationController
  def completion
    permitted_params = params.permit(:prompt)
    prompt = permitted_params[:prompt]
    alpaca = Alpaca.new
    answer = alpaca.complete(prompt)
    render json: {"answer"=> answer}
  end
end

