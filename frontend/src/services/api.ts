import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5678/webhook-test",
  timeout: 60000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
console.log(api.defaults.baseURL);
export default api;