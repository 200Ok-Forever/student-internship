import { deleteRequest, getRequest, postRequest, putRequest } from "./base";

export const getPostedInternships = async (id, token) =>
  await getRequest(`/company/${id}/jobs`, { headers: { Authorization: `Bearer ${token}` } });

export const getApplicants = async (id, token) =>
  await getRequest(`/company/${id}/applicant`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getRecommendations = async (id, token) =>
  await getRequest(`/company/${id}/recommendation`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const postInternship = async (id, data, token) =>
  await postRequest(`/company/${id}/create-job`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const putInternship = async (id, data, token) =>
  await putRequest(`/company/${id}/edit`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteInternship = async (id, token) =>
  await deleteRequest(`/company/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getCompanyInfo = async (id) => 
  await getRequest(`/company/${id}`);

export const postEditCompanyInfo = async (id, data, token) => {
  console.log(token);
  return await postRequest(`/company/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const companyGetJobInfo = async (id) => 
  await getRequest(`company/${id}/jobs`)

export const postForwardApplication = async (jobId, appId, token) =>
  await postRequest(`/company/${jobId}/${appId}/forward`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const postRejectApplication = async (jobId, appId, token) =>
  await postRequest(`/company/${jobId}/${appId}/reject`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const postShortlistApplication = async (jobId, appId, token) =>
  await postRequest(`/company/${jobId}/${appId}/shortlist`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const postUnshortlistApplication = async (jobId, appId, token) =>
  await postRequest(`/company/${jobId}/${appId}/unshortlist`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });