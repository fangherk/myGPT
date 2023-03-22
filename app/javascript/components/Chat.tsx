import React, { useEffect } from "react";
import { useRootStore } from "../hooks/useRootStore";

export const Chat = () => {
  const rootStore = useRootStore();

  useEffect(() => {
    rootStore.chatStore.initWebsocket();
  }, []);

  return (
    <div>
      <form>
        <label>
          Message
          <input name="message"></input>
        </label>
        <button>Chat</button>
      </form>
    </div>
  );
};
