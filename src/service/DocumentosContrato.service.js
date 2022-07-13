import { getHeaderToken } from "./auth.service";
import * as CONFIG from "../configs/config.constants";
import api from "./Api";

export const getAnexosByContrato = uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return api
    .get(`${CONFIG.API_URL}/anexos-contratos/?search=${uuid}`, AUTH_HEADER)
    .then(res => res.data);
};
