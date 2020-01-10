import { getHeaderToken } from "./auth.service";
import CONFIG from "../configs/config.constants";
import api from "./Api";

export const getDocumentosFiscaisByContrato = uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return api
    .get(`${CONFIG.API_URL}/documentos-fiscais/?search=${uuid}`, AUTH_HEADER)
    .then(res => res.data);
};
