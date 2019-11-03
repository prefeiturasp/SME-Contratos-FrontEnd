import axios from "axios";
import { getHeaderToken, getUsuario } from "./auth.service";
import CONFIG from "../configs/config.constants";

export const getUnidadeContrato = uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  return axios
    .get(`${CONFIG.API_URL}/unidades-contratos/${uuid}/`, AUTH_HEADER)
    .then(res => res.data);
};
