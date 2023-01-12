//
import axios from "axios";

//
import { store } from "../store";
store.subscribe(listener);

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

    //
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("pn_refresh");

      const res = await axios.post("/api/v1/user/refresh-token/", {
        refresh_token: refreshToken,
      });

      //
      if (res.status === 201) {
        sessionStorage.setItem("pn_access", res.data.access_token);

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.access_token;

        return axios(originalRequest);
      }
    }

    //
    return Promise.reject(error);
  }
);

export default axiosInstance;
