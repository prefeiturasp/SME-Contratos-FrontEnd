import axios from "axios";
import { getHeaderToken } from "./auth.service";
import CONFIG from "../configs/config.constants";

export const getUnidades = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .get(`${CONFIG.API_URL}/unidades/`, AUTH_HEADER)
    .then(res => res.data);
};
