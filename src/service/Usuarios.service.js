import api from "./Api";
import { getHeaderToken, getUsuario } from "./auth.service";
import * as CONFIG from "../configs/config.constants";

export const getUsuariosLookup = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return api
    .get(`${CONFIG.API_URL}/usuarios/lookup/`, AUTH_HEADER)
    .then(res => res.data);
};

export const getUsuarioByUserName = userName => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return api
    .get(`${CONFIG.API_URL}/usuarios/${userName}/`, AUTH_HEADER)
    .then(res => res.data)
    .catch(res => res);
};

export function getMeuProfile() {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return api
    .get(`${CONFIG.API_URL}/usuarios/${getUsuario().username}/`, AUTH_HEADER)
    .then(res => res.data);
}
