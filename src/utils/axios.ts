//
import axios from "axios";
import Cookies from "js-cookie";

//
import { store } from "../store";

//
import { setAuthToken } from "./api/user";

//
store.subscribe(listener);
const { dispatch } = store;

//
const API_URL = process.env.REACT_APP_API_URL;

//
function listener() {
  const token =
    store.getState().auth.token || sessionStorage.getItem("pn_access");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

/**
 *
 */
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (originalRequest.url.includes('/user/refresh-token/')) {
      return Promise.reject(error);
    }
    //
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("pn_refresh");

      if (!refreshToken) return Promise.reject(error);

      const res = await axiosInstance.post("/api/v1/user/refresh-token/", {
        refresh_token: refreshToken,
      });

      //
      if (res.status === 200) {
        const token = res.data.access_token;

        sessionStorage.setItem("pn_access", token);
        dispatch(setAuthToken(token));
        axiosInstance.defaults.headers.common["Authorization"] =
          "Bearer " + token;

        return axiosInstance(originalRequest);
      }
    }

    //
    return Promise.reject(error);
  }
);

export default axiosInstance;
