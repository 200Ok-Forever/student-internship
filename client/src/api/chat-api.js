import axios from "axios";
import { API } from "./base";

export const getUsers = () => API.get(`/chat/users`);
export const createMeeting = (data) =>
  API.post(`/chat/meeting/invitation`, data);
export const getMeetingList = (token) =>
  API.get("/chat/meetings", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const CHAT_API = axios.create({ baseURL: "https://api.chatengine.io" });

export const newUserOnChat = (data) =>
  CHAT_API.post("/users/", data, {
    headers: { "PRIVATE-KEY": "018017f6-455b-468d-b7f4-62cfa995670e" },
  });
