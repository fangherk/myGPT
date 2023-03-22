import { makeAutoObservable } from "mobx";
import { ChatStore } from "./ChatStore";
import { UserStore } from "./UserStore";

export class RootStore {
  chatStore: ChatStore;
  userStore: UserStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore(this);
    this.chatStore = new ChatStore(this);
  }

  get csrfParams() {
    const csrfToken = document.getElementsByName("csrf-token")[0].getAttribute("content")!;
    const csrfParam = document.getElementsByName("csrf-param")[0].getAttribute("content")!;
    return { csrfParam, csrfToken };
  }
}
