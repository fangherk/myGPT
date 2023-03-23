#!/bin/bash
bundle && yarn
docker compose up -d
bin/rails db:setup
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
git checkout 5cb63e2493c49bc2c3b9b355696e8dc26cdd0380
make
mkdir -p models
cd models
curl -o ggml-alpaca-7b-q4.bin -C - https://ipfs.io/ipfs/QmQ1bf2BTnYxq73MFJWu1B7bQ2UD6qG7D7YDCxhTndVkPC