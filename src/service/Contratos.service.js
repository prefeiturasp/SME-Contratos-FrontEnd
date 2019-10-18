import axios from "axios";
import { getHeaderToken, getUsuario } from "./auth.service";
import CONFIG from "../configs/config.constants";

export function getContratos(filtro) {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  let parametros = ''
  for (var prop in filtro) {
    if (Object.prototype.hasOwnProperty.call(filtro, prop)) {
        if (filtro[prop]){
          let prefix = parametros ? '&' : '?'
          parametros += `${prefix}${prop}=${filtro[prop]}`
        }
    }
  }

  return axios
    .get(`${CONFIG.API_URL}/contratos/${parametros}`, AUTH_HEADER)
    .then(res => res.data);
}

export function getMeusContratos() {
  const AUTH_HEADER = {
    headers : getHeaderToken()
  }
  return axios
    .get(`${CONFIG.API_URL}/contratos/?gestor=${getUsuario().user_id}`, AUTH_HEADER)
    .then(res => res.data);
}

export const getSituacoesContrato = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .get(`${CONFIG.API_URL}/contratos/situacoes/`, AUTH_HEADER)
    .then(res => res.data);
};

export const getEstadosContrato = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .get(`${CONFIG.API_URL}/contratos/estados/`, AUTH_HEADER)
    .then(res => res.data);
};

export default getContratos;
