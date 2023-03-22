import React, { useContext, useRef, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useRootStore } from "../hooks/useRootStore";
import { Container, Text, FormLabel, Input, Button, VStack, FormControl } from "@chakra-ui/react";

export const Login = () => {
  const rootStore = useRootStore();

  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement | null>(null);

  return (
    <Container>
      <Text fontSize="5xl">Login</Text>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const username = e.target[0].value;
          const password = e.target[1].value;
          const res = await rootStore.userStore.login(username, password);

          if (res === undefined) {
            setErrors(true);
            e.target[0].value = "";
            e.target[1].value = "";
            if (usernameRef.current) {
              usernameRef.current.focus();
            }
          } else {
            navigate("/chat");
          }
        }}
      >
        <FormControl isInvalid={errors}>
          <FormLabel>
            Username
            <Input name="username" ref={usernameRef}></Input>
          </FormLabel>
        </FormControl>

        <FormControl isInvalid={errors}>
          <FormLabel>
            Password
            <Input name="password" type="password"></Input>
          </FormLabel>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>

      <Button marginTop="8px">
        <Link to="/signup">Signup</Link>
      </Button>
    </Container>
  );
};
