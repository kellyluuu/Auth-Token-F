
import CONFIG from "../config/index";
import { setToken, getUserFromToken, removeToken } from "./tokenService";

function signup(user) {
  return (
    fetch(`${CONFIG.DEV.URL}/users/signup`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(user),
    })
    .then((res) => {
      if (res.ok) return res.json();
      // Probably a duplicate email
      throw new Error("Email already taken!");
    })
    // Parameter destructuring!
    .then(({ token }) => {
      setToken(token);
    })
    // the above could have been written as
    //.then((token) => token.token);
  );
}

function getUser() {
  return getUserFromToken();
}

function logout() {
  removeToken();
}

function login(creds) {
  return fetch(`${CONFIG.DEV.URL}/users/login`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => setToken(token));
}

export { signup, getUser, logout, login };