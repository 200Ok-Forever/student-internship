import { API } from "./base";

export const getJobsListData = (params) =>
  API.get(`/Internship/internships${params}`);

export const getJob = (id, token) =>
  API.get(
    `/Internship/internships/${id}`,
    token && { headers: { Authorization: `Bearer ${token}` } }
  );
