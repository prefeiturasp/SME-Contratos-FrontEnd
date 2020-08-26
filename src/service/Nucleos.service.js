import api from "./Api";
import { getHeaderToken } from "./auth.service";
import * as CONFIG from "../configs/config.constants";

export const getNucleos = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  return api
    .get(`${CONFIG.API_URL}/nucleos/`, AUTH_HEADER)
    .then(res => res.data);
};
