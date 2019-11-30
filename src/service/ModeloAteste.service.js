import axios from "axios";
import { getHeaderToken } from "./auth.service";
import CONFIG from "../configs/config.constants";

export function getModeloAteste(uuid) {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .get(`${CONFIG.API_URL}/modelo-ateste/${uuid}/`, AUTH_HEADER)
    .then(res => {
      return res.data;
    });
}
