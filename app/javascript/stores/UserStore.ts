import { makeAutoObservable, runInAction } from "mobx";
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

  async login(username, password) {
    const result = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        [this.rootStore.csrfParams.csrfParam]: this.rootStore.csrfParams.csrfToken,
      }),
    });
    if (result.status == 200) {
      const body = await result.json();

      runInAction(() => {
        this.currentUser = new User(username);
      });

      return this.currentUser;
    }
  }

  async logout() {
    const _result = await fetch("/api/logout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        [this.rootStore.csrfParams.csrfParam]: this.rootStore.csrfParams.csrfToken,
      }),
    });
  }

  async signup(username, password) {
    const result = await fetch("/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        [this.rootStore.csrfParams.csrfParam]: this.rootStore.csrfParams.csrfToken,
      }),
    });
    if (result.status == 200) {
      const body = await result.json();
      runInAction(() => {
        this.currentUser = new User(username);
      });

      return this.currentUser;
    }
  }
}
