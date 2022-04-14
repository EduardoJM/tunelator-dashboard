import axios from "axios";
import config from "../config";
import { refresh } from "./auth";

const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status == 401) {
      let token: string | null = null;
      if (localStorage.getItem("@TUNELATOR_REFRESH")) {
        token = localStorage.getItem("@TUNELATOR_REFRESH");
      } else if (sessionStorage.getItem("@TUNELATOR_REFRESH")) {
        token = localStorage.getItem("@TUNELATOR_REFRESH");
      }
      if (!token) {
        return Promise.reject(error);
      }
      api.defaults.headers.common["Authorization"] = "";
      const data = await refresh(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
      return api.request({
        ...error.response.config,
        headers: {
          ...error.response.config.headers,
          Authorization: `Bearer ${data.access}`,
        },
      });
    }
    return Promise.reject(error);
  }
);

export default api;
