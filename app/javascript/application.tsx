// new WebSocket("wss://localhost:3334");
// import { createConsumer } from "@rails/actioncable";
//
// const consumer = createConsumer("http://localhost:3000/cable");
// consumer.subscriptions.create(
//   { channel: "UserChannel" },
//   {
//     received(data) {
//       console.log(data);
//     },
//   }
// );

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

const root = createRoot(document.getElementById("react"));
root.render(<App />);
