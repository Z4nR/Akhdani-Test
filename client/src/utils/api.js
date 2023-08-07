const BASE_URL = "http://localhost:5500/v1";

const putAccessToken = (accessToken) => {
  return localStorage.setItem("accessToken", accessToken);
};

const removeAccessToken = () => {
  return localStorage.removeItem("accessToken");
};

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const fetchWithToken = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

const regist = async ({ name, email, username, password, role }) => {
  const data = JSON.stringify({ name, email, username, password, role });

  const response = await fetch(`${BASE_URL}/user/regist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  const responseJson = await response.json();
  if (response.status !== 201) {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
};

const login = async ({ username, password }) => {
  const data = JSON.stringify({ username, password });

  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  const responseJson = await response.json();
  if (response.status !== 200) {
    alert(responseJson.message);
    return { error: true, token: null };
  }

  return { error: false, token: responseJson.token };
};

const forgotPassword = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/user/forget-password/${email}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  const responseJson = await response.json();
  if (response.status !== 202) {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
};

const getUserLogged = async () => {
  const response = await fetchWithToken(`${BASE_URL}/user/me`);
  const responseJson = await response.json();

  if (response.status !== 200) {
    return { error: true, data: null };
  }

  return { error: false, logged: responseJson };
};

export {
  putAccessToken,
  removeAccessToken,
  getAccessToken,
  regist,
  login,
  forgotPassword,
  getUserLogged,
};
