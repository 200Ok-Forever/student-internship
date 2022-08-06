import { deleteRequest, getRequest, patchRequest, postRequest } from './base';

export const getPosts = async (params) => {
  await getRequest(`/forum/posts?industry=${params.industry}&sort=${params.sort}&searchTerm=${params.searchTerm}&userId=${params.userId}&pageNumber=${params.pageNumber}`)
}

export const getPost = async (id) => {
  await getRequest(`/forum/posts/${id}`)
}

export const postPost = async (data, token) => {
  await postRequest('/forum/posts', data, { headers: { "Authorization": token }})
}

export const patchPost = async (id, data, token) => {
  await patchRequest(`/forum/posts/${id}`, data, { headers: { "Authorization": token }})
}

export const deletePost = async (id, token) => {
  await deleteRequest(`/forum/posts/${id}`, { headers: { "Authorization": token }})
}

export const postComment = async (id, data, token) => {
  await postRequest(`/forum/posts/${id}/comment`, data, { headers: { "Authorization": token }})
}
