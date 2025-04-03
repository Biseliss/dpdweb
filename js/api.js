import { API_BASE_URL } from "./config.js";

export async function apiRequest(endpoint, method = 'GET', body = null, isFormData = false) {
  const url = `${API_BASE_URL}${endpoint}`;

  let headers = {};
  let fetchOptions = {
    method,
    credentials: 'include',
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (body !== null) {
    fetchOptions.body = isFormData ? body : JSON.stringify(body);
  }

  fetchOptions.headers = headers;

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errMessage = await response.json().catch(() => ({}));
    throw new Error(errMessage.detail || `Error ${response.status}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  return data;
}

export async function adminDeleteAvatar(userId) {
  return await apiRequest(`/admin/users/${userId}/avatar`, 'DELETE');
}

export async function registerUser(payload) {
  return await apiRequest('/auth/register', 'POST', payload);
}

export async function loginUser(payload) {
  return await apiRequest('/auth/login', 'POST', payload);
}

export async function logoutUser() {
  return await apiRequest('/auth/logout', 'POST');
}

export async function getFeed(page = 1) {
  return await apiRequest(`/recipe/feed?page=${page}`, 'GET');
}

export async function getRecipe(recipeId) {
  return await apiRequest(`/recipe?id=${recipeId}`, 'GET');
}

export async function createRecipe(formData) {
  return await apiRequest('/recipe/', 'POST', formData, true);
}

export async function ratePost(postId, like = true) {
  return await apiRequest('/recipe/rate_post', 'POST', {
    post_id: postId,
    like
  });
}

export async function getComments(postId, page = 1) {
  return await apiRequest(`/comment?post=${postId}&page=${page}`, 'GET');
}

export async function createComment(payload) {
  return await apiRequest('/comment', 'POST', payload);
}

export async function deleteComment(commentId) {
  return await apiRequest(`/comment?comment_id=${commentId}`, 'DELETE');
}

export async function deleteRecipe(postId) {
  return await apiRequest(`/recipe/?post_id=${postId}`, 'DELETE');
}

export async function getCurrentUser() {
  return await apiRequest('/user/me', 'GET');
}

export async function editCurrentUser(formData) {
  return await apiRequest('/user/me/edit', 'PUT', formData, true);
}

export async function getProfile(username) {
  return await apiRequest(`/user/${username}`, 'GET');
}

export async function getUserFeed(username, page = 1) {
  return await apiRequest(`/user/${username}/feed?page=${page}`, 'GET');
}

export async function getAllUsers() {
  return await apiRequest(`/admin/users`, 'GET');
}

export async function toggleAdmin(userId) {
  return await apiRequest(`/admin/users/${userId}/toggle_admin`, 'PUT');
}

export async function adminDeleteUser(userId) {
  return await apiRequest(`/admin/users/${userId}`, 'DELETE');
}
