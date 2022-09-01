//
import axios from "axios";

//
import { store } from "../store";
store.subscribe(listener);

//
const API_URL = process.env.REACT_APP_API_URL;

//
function listener() {
  const token = store.getState().auth.token ?? "";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

export default axiosInstance;
