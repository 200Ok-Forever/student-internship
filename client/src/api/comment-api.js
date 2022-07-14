import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5004" });
API.defaults.headers.post["Content-Type"] = "application/json";

// job description page
export const postComment = (jobId, uId, comment) =>
  API.post(
    `/Internship/internships/${jobId}/comments`,
    JSON.stringify({
      uid: uId,
      comment: comment,
      parent_id: 0,
    })
  );

export const replyComment = (jobId, uId, comment, parentId) =>
  API.post(
    `/Internship/internships/${jobId}/comments`,
    JSON.stringify({
      uid: uId,
      comment: comment,
      parent_id: parentId,
    })
  );
