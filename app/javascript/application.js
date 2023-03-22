// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";

// new WebSocket("wss://localhost:3334");
import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer("http://localhost:3000/cable");
consumer.subscriptions.create(
  { channel: "UserChannel" },
  {
    received(data) {
      console.log(data);
    },
  }
);
