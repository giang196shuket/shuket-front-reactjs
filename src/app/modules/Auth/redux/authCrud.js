import axios from "axios";
let LOGIN_URL = process.env.REACT_APP_BACKEND_URL + "/api/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

let ME_URL = process.env.REACT_APP_BACKEND_URL + "/api/userProfile";

export function login(username, password) {
  console.log("axios", axios)
  return axios.post(LOGIN_URL, { username, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
