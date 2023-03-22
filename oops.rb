require 'pty'
cmd = "./llama.cpp/main -m ./llama.cpp/models/ggml-alpaca-7b-q4.bin -p \"what is the the color of a basketball?\" 2>/dev/null"
PTY.spawn(cmd) do |stdout, _, _|
  result = ""
  loop do
    ready = IO.select([stdout], nil, nil, 0.1) # wait for 0.1 seconds for input
    next unless ready # skip if no input is available

    begin
      output = stdout.read_nonblock(1024) # read up to 4096 bytes of output
      if output != ""
        result+= output
        puts output
        ActionCable.server.broadcast("chat", { output: })
      end
    rescue IO::WaitReadable, EOFError # handle exceptions
      # do nothing, just continue the loop
      break
    end
  end
  ActionCable.server.broadcast("chat", { done: true })
end

