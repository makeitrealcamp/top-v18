import axios from "axios";
import { BASE_URL } from "./const";
import { clearSession, getSession } from "./session";

const instance = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function onIntercept(config) {
    // Do something before request is sent
    const token = getSession();
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function onError(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function onIntercept(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function onError(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      clearSession();
      document.location = "/signin";
    }

    return Promise.reject(error);
  }
);

export default instance;
