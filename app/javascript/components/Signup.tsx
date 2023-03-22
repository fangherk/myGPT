import React, { useContext } from "react";
import { useUserStore } from "../hooks/useUserStore";

export const Signup = () => {
  const userStore = useUserStore();

  return (
    <div>
      <h1>Sign up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target[0].value;
          const password = e.target[1].value;
          userStore.signup(username, password);
        }}
      >
        <label>
          Username
          <input name="username"></input>
        </label>
        <label>
          Password
          <input name="password"></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
