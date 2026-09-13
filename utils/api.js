const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('accessToken', token);
}

function removeAccessToken() {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem('accessToken');
}

async function _fetchWithAuth(url, options = {}) {
  const token = getAccessToken();

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name, email, password
    })
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  putAccessToken(responseJson.data.token);

  return responseJson.data;
}

async function getOwnProfile() {
  const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.data.users;
}

async function getAllThreads() {
  const response = await fetch(`${BASE_URL}/threads`);

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.data.threads;
}

async function getDetailThread(threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}`);

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.data.detailThread;
}

async function createThread({ title, body, category }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title, body, category
    })
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.data.thread;
}

async function createComment({ threadId, content }) {
  const response = await _fetchWithAuth(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ threadId, content })
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.data.comment;
}

async function upVoteThread(threadId) {
  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/up-vote`,
    {
      method: 'POST',
    },
  );

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

async function downVoteThread(threadId) {
  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/down-vote`,
    {
      method: 'POST',
    },
  );

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

async function neutralVoteThread(threadId) {
  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/neutral-vote`,
    {
      method: 'POST',
    },
  );

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

const api = {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getDetailThread,
  createThread,
  createComment,
  downVoteThread,
  upVoteThread,
  neutralVoteThread
};

export default api;
