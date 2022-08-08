import {deleteRequest, getRequest, patchRequest, postRequest} from './base';

export const getPosts = async (params) => {
  return await getRequest(`/forum/posts?industry=${params.industry}${params.sort ? '&sort=' + params.sort : ''}${params.searchTerm ? '&searchTerm=' + params.searchTerm : ''}${params.userId ? '&userId=' + params.userId : ''}${params.pageNumber ? '&pageNumber=' + params.pageNumber : ''}`)
}

export const getPost = async (id) => {
  await getRequest(`/forum/posts/${id}`)
}

export const postPost = async (data, token) => {
  await postRequest('/forum/posts', data, {headers: {"Authorization": token}})
}

export const patchPost = async (id, data, token) => {
  await patchRequest(`/forum/posts/${id}`, data, {headers: {"Authorization": token}})
}

export const deletePost = async (id, token) => {
  await deleteRequest(`/forum/posts/${id}`, {headers: {"Authorization": token}})
}

export const postComment = async (id, data, token) => {
  await postRequest(`/forum/posts/${id}/comment`, data, {headers: {"Authorization": token}})
}
