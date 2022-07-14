import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5004" });

// job description page
export const postComment = (jobId, uId, comment) =>
  API.post(
    `/Internship/internships/${jobId}/comments`,
    JSON.stringify({
      uid: uId,
      comment: comment,
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
