import axios from "axios";
import initInterceptors from "./interceptors";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
  // baseURL: "http://localhost:3000/api",
});

initInterceptors(instance);

export default instance;
