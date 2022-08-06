import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5004" });

export const getJobsListData = (params) =>
  API.get(`/Internship/internships${params}`);

export const getJob = (id, uid) =>
  API.get(`/Internship/internships/${id}?uid=${uid}`);
