import React from "react";

import { logIn, register } from "../../utils";

export function Auth(props) {
  const { master, useMaster } = props;

  return (
    <div id="login">
      <input
        type="text"
        placeholder="Enter Email"
        value={master.email}
        onChange={(ev) => {
          useMaster({ ...master, username: ev.target.value });
        }}
      ></input>
      <input
        type="password"
        placeholder="Enter Password"
        value={master.password}
        onChange={(ev) => {
          useMaster({ ...master, password: ev.target.value });
        }}
      ></input>
      <button
        onClick={(ev) => {
          (ev) => {
            ev.preventDefault();
          };
          register({ email: master.email, password: master.password });
        }}
      >
        Register
      </button>
    </div>
  );
}
