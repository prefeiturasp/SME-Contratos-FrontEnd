import { getHeaderToken } from "./auth.service";
import CONFIG from "../configs/config.constants";
import api from "./Api";

export const getEmpresasLookup = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return api
    .get(`${CONFIG.API_URL}/empresas/lookup/`, AUTH_HEADER)
    .then(res => res.data);
};
