import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { RootStore } from "./RootStore";

class User {
  username: string;

  constructor(username) {
    makeAutoObservable(this);
    this.username = username;
  }
}

export class UserStore {
  currentUser: User | null = null;
  rootStore: RootStore;

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get csrfParams() {
    const csrfToken = document.getElementsByName("csrf-token")[0].getAttribute("content")!;
    const csrfParam = document.getElementsByName("csrf-param")[0].getAttribute("content")!;
    return { csrfParam, csrfToken };
  }

  async login(username, password) {
    const result = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        [this.csrfParams.csrfParam]: this.csrfParams.csrfToken,
      }),
    });
    if (result.status == 200) {
      const body = await result.json();
      this.currentUser = new User(username);
    }
  }

  async signup(username, password) {
    const result = await fetch("/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        [this.csrfParams.csrfParam]: this.csrfParams.csrfToken,
      }),
    });
    if (result.status == 200) {
      const body = await result.json();
      this.currentUser = new User(username);
    }
  }
}
