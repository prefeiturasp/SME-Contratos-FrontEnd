import { getHeaderToken } from "./auth.service";
import * as CONFIG from "../configs/config.constants";
import api from "./Api";

export const getUnidadesDeMedidaLookup = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return api
    .get(`${CONFIG.API_URL}/unidades-de-medida/lookup/`, AUTH_HEADER)
    .then(res => res.data);
};
