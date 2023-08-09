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
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, logged: responseJson };
};

const addCityData = async ({ name, lat, long, province, island, aboard }) => {
  const data = JSON.stringify({ name, lat, long, province, island, aboard });

  const response = await fetchWithToken(`${BASE_URL}/city/add`, {
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

const rangeCityCount = async ({ fromCity, destinationCity }) => {
  const data = JSON.stringify({ fromCity, destinationCity });

  const response = await fetchWithToken(`${BASE_URL}/city/range`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  const responseJson = await response.json();
  if (response.status !== 200) {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false, range: responseJson.range };
};

const getCityData = async () => {
  const response = await fetchWithToken(`${BASE_URL}/city/data`);
  const responseJson = await response.json();

  if (response.status !== 200) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, city: responseJson };
};

const editCity = async (id, { name, lat, long, province, island, aboard }) => {
  const data = JSON.stringify({ name, lat, long, province, island, aboard });

  const response = await fetchWithToken(`${BASE_URL}/city/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  const responseJson = await response.json();
  if (response.status !== 202) {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
};

const getCityById = async (id) => {
  const response = await fetchWithToken(`${BASE_URL}/city/data/${id}`);
  const responseJson = await response.json();

  if (response.status !== 200) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, city: responseJson };
};

const deleteCity = async (id) => {
  const response = await fetchWithToken(`${BASE_URL}/city/delete/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (response.status !== 200) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false };
};

const createPerdin = async ({
  name,
  note,
  startDate,
  endDate,
  fromCity,
  destinationCity,
  durationDay,
  status,
}) => {
  const data = JSON.stringify({
    name,
    note,
    startDate,
    endDate,
    fromCity,
    destinationCity,
    durationDay,
    status,
  });

  const response = await fetchWithToken(`${BASE_URL}/perdin/create`, {
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

const getPerdinByName = async (name) => {
  const response = await fetchWithToken(`${BASE_URL}/perdin/${name}/data`);
  const responseJson = await response.json();

  if (response.status !== 200) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, perdin: responseJson };
};

const getPerdinById = async (id) => {
  const response = await fetchWithToken(`${BASE_URL}/perdin/${id}`);
  const responseJson = await response.json();

  if (response.status !== 200) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, perdin: responseJson };
};

const getAllPerdin = async () => {
  const response = await fetchWithToken(`${BASE_URL}/perdin/data`);
  const responseJson = await response.json();

  if (response.status !== 200) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, perdin: responseJson };
};

export {
  putAccessToken,
  removeAccessToken,
  getAccessToken,
  regist,
  login,
  forgotPassword,
  getUserLogged,
  addCityData,
  rangeCityCount,
  getCityData,
  getCityById,
  editCity,
  deleteCity,
  createPerdin,
  getPerdinByName,
  getAllPerdin,
  getPerdinById,
};
