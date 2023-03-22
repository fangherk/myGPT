import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";
import { createConsumer, Consumer } from "@rails/actioncable";

class Chat {
  messages: Array<string> = [];
  currentStream: string = "";
  chatId: string | null = null;
  chatStore: ChatStore;

  constructor(chatStore) {
    makeAutoObservable(this);
    this.chatStore = chatStore;
  }

  async sendMessage(message) {
    this.messages.push(message);
    this.chatStore.isSending = true;
    const chatId = this.chatId;
    const result = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message,
        chatId,
        [this.chatStore.rootStore.csrfParams.csrfParam]:
          this.chatStore.rootStore.csrfParams.csrfToken,
      }),
    });
    runInAction(() => {
      console.log("here");
      this.chatStore.isSending = false;
    });
  }

  addToStream(text: string) {
    this.currentStream += text;
  }

  finishStream() {
    this.messages.push(this.currentStream);
    this.currentStream = "";
  }
}

export class ChatStore {
  rootStore: RootStore;
  consumer: Consumer | null = null;
  chat: Chat;
  isSending: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.chat = new Chat(this);
  }

  initWebsocket() {
    this.consumer = createConsumer("/cable");
    this.consumer.subscriptions.create(
      { channel: "UserChannel" },
      {
        received: (data) => {
          console.log(data);
          if (data["output"]) {
            this.chat.addToStream(data["output"]);
          }
          if (data["done"] === true) {
            this.chat.finishStream();
          }
        },
      }
    );
  }
}
