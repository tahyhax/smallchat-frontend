function setAuthToken(config) {
  const token = localStorage.getItem(process.env.VUE_APP_LS_TOKEN_KEY);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}

function transformResponse(response) {
  return response.data;
}

export default function(axios) {
  axios.interceptors.request.use(setAuthToken);
  axios.interceptors.response.use(transformResponse);
}
