import axios from "axios";
import { getCookie } from "utils/cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const methodsNeedToken = ["post", "put", "delete"];

api.interceptors.request.use(
  (request) => {
    const token = getCookie()
    if (token && methodsNeedToken.includes(request.method)) {
      request.headers["Authorization"] = `Bearer ${token}`
    }
    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;
