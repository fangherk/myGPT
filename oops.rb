require 'pty'
cmd = "./llama.cpp/main -m ./llama.cpp/models/ggml-alpaca-7b-q4.bin --color -p \"what is the the color of a basketball?\" 2>/dev/null"
PTY.spawn(cmd) do |stdout, _, _|
  result = ""
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

        puts new_output if new_output.present?

        ActionCable.server.broadcast("chat", { output: })
      end
    rescue IO::WaitReadable, EOFError # handle exceptions
      # do nothing, just continue the loop
      break
    end
  end
  ActionCable.server.broadcast("chat", { done: true })
end

