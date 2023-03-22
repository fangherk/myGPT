import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./Login";
import { UserStore } from "../stores/UserStore";
import { RootStoreContext } from "../hooks/useRootStore";
import { Signup } from "./Signup";
import { Chat } from "./Chat";
import { RootStore } from "../stores/RootStore";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

export const App = () => {
  const [store] = useState(() => new RootStore());
  return (
    <ChakraProvider>
      <RootStoreContext.Provider value={store}>
        <RouterProvider router={router} />
      </RootStoreContext.Provider>
    </ChakraProvider>
  );
};
