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
}
