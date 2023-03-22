import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useRootStore } from "../hooks/useRootStore";
import {
  Container,
  Input,
  FormLabel,
  Button,
  Text,
  FormControl,
  Box,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Chat = observer(() => {
  const rootStore = useRootStore();

  useEffect(() => {
    rootStore.chatStore.initWebsocket();
  }, []);

  const navigate = useNavigate();

  return (
    <Container centerContent>
      <Text fontSize="5xl">Messages</Text>

      <VStack divider={<StackDivider borderColor="gray.200" />}>
        {rootStore.chatStore.chat.messages.map((text, i) => {
          return <Text key={i}>{text}</Text>;
        })}

        {rootStore.chatStore.chat.currentStream !== "" && (
          <Text>{rootStore.chatStore.chat.currentStream}</Text>
        )}
      </VStack>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const message = e.target[0].value;
          if (rootStore.chatStore.isSending || message === "") {
            return false;
          } else {
            rootStore.chatStore.chat.sendMessage(message);
            e.target[0].value = "";
          }
        }}
      >
        <FormLabel>
          Message
          <Input name="message" placeholder="Type your message here"></Input>
        </FormLabel>

        <Button isLoading={rootStore.chatStore.isSending}>Chat</Button>
      </form>

      <Box pos="absolute" top="8px" right="8px">
        <Button
          onClick={() => {
            rootStore.userStore.logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
});
