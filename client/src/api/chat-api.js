import axios from "axios";
import { API } from "./base";

export const getUsers = () => API.get(`/chat/users`);

export const CHAT_API = axios.create({ baseURL: "https://api.chatengine.io" });

export const newUserOnChat = (data) => {
  const newUser = {
    username: data.userid.toString(),
    secret: data.userid.toString(),
    first_name: data.name,
    last_name: data.avatar,
  };
  return CHAT_API.post("/users/", newUser, {
    headers: { "PRIVATE-KEY": "018017f6-455b-468d-b7f4-62cfa995670e" },
  });
};
