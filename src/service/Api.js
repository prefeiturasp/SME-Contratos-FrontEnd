import axios from "axios";
import CONFIG from "../configs/config.constants";

export default axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 180000
});
