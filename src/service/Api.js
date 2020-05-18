import axios from "axios";
import * as CONFIG from "../configs/config.constants";
import { verifyToken, saveLocation, logout } from "./auth.service";

const instance = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 180000
});

instance.interceptors.request.use((config) => {
  verifyToken()
  return config
},
(error) => {
  saveLocation()
  logout()
  return Promise.reject(error)
})

export default instance;
