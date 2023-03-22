import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { createConsumer, Consumer } from "@rails/actioncable";

export class ChatStore {
  rootStore: RootStore;
  consumer: Consumer | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  initWebsocket() {
    console.log("once");
    this.consumer = createConsumer("/cable");
    this.consumer.subscriptions.create(
      { channel: "UserChannel" },
      {
        received(data) {
          console.log(data);
        },
      }
    );
  }

  async sendMessage(message, chatId = null) {
    const result = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message,
        chatId,
        [this.rootStore.csrfParams.csrfParam]: this.rootStore.csrfParams.csrfToken,
      }),
    });
  }
}
