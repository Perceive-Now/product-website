import axios, { AxiosInstance } from "axios";
import jsCookie from "js-cookie";

//
// import { store } from "../store";
// import { setAuthToken } from "../stores/auth";

//

export const API_PROD_URL =
  "https://template-user-requirements-prod.lemonmoss-01a23a5e.eastus2.azurecontainerapps.io";

const API_URL = process.env.REACT_APP_API_URL;

/**
 *
 */

const getToken = (): string | null => {
  const refreshToken = jsCookie.get("pn_refresh");
  // Example: Retrieve token from localStorage
  return refreshToken || "";
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding Auhorization header to every request if token is available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    //
    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Intercepting API response
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;

//     // If the API call fails while trying to get refresh token, there is nothing we can do about it!
//     // if (originalRequest.url.includes("/user/refresh-token/")) {
//     //   if (error.response.status === 401) {
//     //     store.dispatch(setAuthToken(undefined));

//     //     jsCookie.remove("pn_refresh");
//     //     sessionStorage.removeItem("pn_access");
//     //   }
//     //   return Promise.reject(error);
//     // }
//     // We are just trying to get refresh token please
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       // Getting refresh token saved in cookie
//       const refreshToken = jsCookie.get("pn_refresh");

//       if (refreshToken === "undefined" || !refreshToken) {
//         sessionStorage.removeItem("pn_access");
//         return Promise.reject(error);
//       }

//       // Making API call to get new set of tokens
//       // const res = await axiosInstance.post("/api/v1/user/refresh-token/", {
//       //   refresh: refreshToken,
//       // });

//       //
//       if (refreshToken) {
//         const token = refreshToken;

//         // Setting token values
//         store.dispatch(setAuthToken(token));
//         sessionStorage.setItem("pn_access", token);
//         jsCookie.set("pn_refresh", refreshToken);

//         .defaults.headers.common["Authorization"] = `Bearer ${token}`;

//         return axiosInstance(originalRequest);
//       }

//       // deleting access and refresh tokens
//       store.dispatch(setAuthToken(undefined));

//       jsCookie.remove("pn_refresh");
//       sessionStorage.removeItem("pn_access");
//     }

//     //
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
