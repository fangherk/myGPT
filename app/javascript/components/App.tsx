import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./Login";
import { UserStore } from "../stores/UserStore";
import { UserStoreContext } from "../hooks/useUserStore";
import { Signup } from "./Signup";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export const App = () => {
  const [store] = useState(() => new UserStore());
  return (
    <UserStoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </UserStoreContext.Provider>
  );
};
