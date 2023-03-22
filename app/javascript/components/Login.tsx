import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useRootStore } from "../hooks/useRootStore";

export const Login = () => {
  const rootStore = useRootStore();

  return (
    <div>
      <Link to="/signup">Signup</Link>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target[0].value;
          const password = e.target[1].value;
          rootStore.userStore.login(username, password);
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
