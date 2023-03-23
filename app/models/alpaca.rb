require 'pty'

class Alpaca
  FIRST_PROMPT = """Below is a conversation between a human and a helpful assistant.
"""

  attr :user

  def initialize(user, chat_messages)
    @user = user
    @chat_messages = chat_messages
  end
  
  def create_full_context(new_message)
    final_messages = []
    @chat_messages.each do |message|
      if message['user'] == 'MODEL'
        final_messages << "Assistant: #{message['text']}"
      else
        final_messages << "Human: #{message['text']}"
      end
    end

    final_s = final_messages.join('\n')
    
    "#{FIRST_PROMPT}\n#{final_s}\nHuman: #{new_message}\nAssistant:"
  end

  def run_model(new_message)
    aggregated_prompt = create_full_context(new_message)
    cmd = "./llama.cpp/main -m ./llama.cpp/models/ggml-alpaca-7b-q4.bin --temp 0.2 --color -p \"#{aggregated_prompt}\" 2>/dev/null"
    result = ""
    PTY.spawn(cmd) do |stdout, _, _|
      has_seen_escape = false

      loop do
        ready = IO.select([stdout], nil, nil, 0.1) # wait for 0.1 seconds for input
        next unless ready # skip if no input is available

        begin
          output = stdout.read_nonblock(1024) # read up to 4096 bytes of output
          if output != ""
            new_output = nil
            if output.include?("\e[0m")
              splitted = output.split("\e[0m")

              new_output
              if !has_seen_escape
                new_output = splitted[1..].join('')
                has_seen_escape = true
              else
                new_output = splitted.join('')
              end

              result += new_output
            elsif has_seen_escape
              new_output = output
            end
            puts output
            UserChannel.broadcast_to(user, { output: new_output }) if new_output.present?
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