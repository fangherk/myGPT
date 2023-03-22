import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useRootStore } from "../hooks/useRootStore";

export const Chat = observer(() => {
  const rootStore = useRootStore();

  useEffect(() => {
    rootStore.chatStore.initWebsocket();
  }, []);

  return (
    <div>
      <span>Messages</span>
      {rootStore.chatStore.chat.messages.map((text) => {
        return <span>{text}</span>;
      })}
      <span>{rootStore.chatStore.chat.currentStream}</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const message = e.target[0].value;
          if (rootStore.chatStore.isSending || message === "") {
            return false;
          } else {
            rootStore.chatStore.sendMessage(message);
          }
        }}
      >
        <label>
          Message
          <input name="message"></input>
        </label>
        <button disabled={rootStore.chatStore.isSending}>Chat</button>
      </form>
    </div>
  );
});
