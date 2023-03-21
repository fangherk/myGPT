# README


Get the alpaca model.

```
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make
mkdir -p llama.cpp/models
cd llama.cpp/models
curl -o ggml-alpaca-7b-q4.bin -C - https://ipfs.io/ipfs/QmQ1bf2BTnYxq73MFJWu1B7bQ2UD6qG7D7YDCxhTndVkPC
```

NOTE: You might have to checkout a git branch from a few days ago if the models weights are too old.