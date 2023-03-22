require 'pty'

class Alpaca
  ASSISTANT_PROMPT = """
  Assistant is a large language model trained by OpenAI.
  Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.
  Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions on a wide range of topics.
  Overall, Assistant is a powerful tool that can help with a wide range of tasks and provide valuable insights and information on a wide range of topics. Whether you need help with a specific question or just want to have a conversation about a particular topic, Assistant is here to assist.

  Human: %s
  Assistant:
  """

  attr :user
  def initialize(user)
    @user = user
  end

  def run_model(prompt)
    aggregated_prompt = format(ASSISTANT_PROMPT, prompt)
    cmd = "./llama.cpp/main -m ./llama.cpp/models/ggml-alpaca-7b-q4.bin -p \"#{aggregated_prompt}\" 2>/dev/null"
    result = ""
    PTY.spawn(cmd) do |stdout, _, _|
      loop do
        ready = IO.select([stdout], nil, nil, 0.1) # wait for 0.1 seconds for input
        next unless ready # skip if no input is available

        begin
          output = stdout.read_nonblock(1024) # read up to 4096 bytes of output
          if output != ""
            result+= output
            puts output
            UserChannel.broadcast_to(user, { output: })
          end
        rescue IO::WaitReadable, EOFError # handle exceptions
          # do nothing, just continue the loop
          break
        end
      end
      UserChannel.broadcast_to(user, { done: true })
    end
    result
  end

  def complete(prompt)
    run_model(prompt)
  end
end