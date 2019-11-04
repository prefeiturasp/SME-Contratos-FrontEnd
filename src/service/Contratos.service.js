import axios from "axios";
import { getHeaderToken, getUsuario } from "./auth.service";
import CONFIG from "../configs/config.constants";
import { formatadorDeData } from "../utils/formatador";

export function getContratos(filtro) {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  let parametros = "";
  for (var prop in filtro) {
    if (Object.prototype.hasOwnProperty.call(filtro, prop)) {
      if (filtro[prop]) {
        let prefix = parametros ? "&" : "?";
        parametros += `${prefix}${prop}=${filtro[prop]}`;
      }
    }
  }

  return axios
    .get(`${CONFIG.API_URL}/contratos/${parametros}`, AUTH_HEADER)
    .then(res => {
      return formataData(res.data);
    });
}

const formataData = datas => {
  return datas.map(data => ({
    ...data,
    data_encerramento: formatadorDeData(data.data_encerramento)
  }));
};

export function getMeusContratos() {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .get(
      `${CONFIG.API_URL}/contratos/?gestor=${getUsuario().user_id}`,
      AUTH_HEADER
    )
    .then(res => res.data);
}

export const getContratoByUUID = uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  return axios.get(`${CONFIG.API_URL}/contratos/${uuid}/`, AUTH_HEADER)
              .then(res => res.data)
}

export function getTermo(termo) {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .get(`${CONFIG.API_URL}/contratos/?termo_contrato=${termo}`, AUTH_HEADER)
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

export const createContrato = payLoad => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .post(`${CONFIG.API_URL}/contratos/`, payLoad, AUTH_HEADER)
    .then(
      res => res.data,
      res => {
        return { statusCode: res.statusCode, result: res };
      }
    )
    .catch(error => {
      return { error: error };
    });
};

export const updateContrato = (payLoadAlterar, contratoUuid) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .put(
      `${CONFIG.API_URL}/contratos/${contratoUuid}/`,
      payLoadAlterar,
      AUTH_HEADER
    )
    .then(
      res => res.data,
      res => {
        return { statusCode: res.statusCode, result: res };
      }
    )
    .catch(error => {
      return { error: error };
    });
};

export default getContratos;
