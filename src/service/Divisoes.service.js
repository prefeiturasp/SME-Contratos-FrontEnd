import axios from "axios";
import { getHeaderToken, getUsuario } from "./auth.service";
import CONFIG from "../configs/config.constants";

export const getDivisoes = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  return axios
    .get(`${CONFIG.API_URL}/divisoes/`, AUTH_HEADER)
    .then(res => res.data);
};
