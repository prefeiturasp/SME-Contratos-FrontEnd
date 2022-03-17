import api from "./Api";
import { getHeaderToken } from "./auth.service";
import * as CONFIG from "../configs/config.constants";

export const getTiposServicoLookup = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return api
    .get(`${CONFIG.API_URL}/tipos-servico/lookup/`, AUTH_HEADER)
    .then(res => res.data);
};

export const criaTipoServico = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = "tipos-servico/";
  return await api.post(url, payload, AUTH_HEADER);
};
