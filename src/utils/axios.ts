import axios from "axios";
import jsCookie from "js-cookie";

//
import { store } from "../store";
import { setAuthToken } from "../stores/auth";

//
const API_URL = process.env.REACT_APP_API_URL;

/**
 *
 */
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding Auhorization header to every request if token is available
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  //
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Intercepting API response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // If the API call fails while trying to get refresh token, there is nothing we can do about it!
    if (originalRequest.url.includes("/user/refresh-token/")) {
      return Promise.reject(error);
    }

    // We are just trying to get refresh token please
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Getting refresh token saved in cookie
      const refreshToken = jsCookie.get("pn_refresh");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      // Making API call to get new set of tokens
      const res = await axiosInstance.post("/api/v1/user/refresh-token/", {
        refresh: refreshToken,
      });

      //
      if (res.status === 200) {
        const token = res.data.access;

        // Setting token values
        store.dispatch(setAuthToken(token));
        sessionStorage.setItem("pn_access", token);
        jsCookie.set("pn_refresh", res.data.refresh);

        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      }

      // deleting access and refresh tokens
      store.dispatch(setAuthToken(undefined));

      jsCookie.remove("pn_refresh");
      sessionStorage.removeItem("pn_access");
    }

    //
    return Promise.reject(error);
  },
);

export default axiosInstance;
