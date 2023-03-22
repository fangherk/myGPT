import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { createConsumer, Consumer } from "@rails/actioncable";

class Chat {
  messages: Array<string> = [];
  currentStream: string = "";

  constructor() {
    makeAutoObservable(this);
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
  isSending: boolean;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.chat = new Chat();
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

  async sendMessage(message, chatId = null) {
    this.isSending = true;
    const result = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message,
        chatId,
        [this.rootStore.csrfParams.csrfParam]: this.rootStore.csrfParams.csrfToken,
      }),
    });
    this.isSending = false;
  }
}
