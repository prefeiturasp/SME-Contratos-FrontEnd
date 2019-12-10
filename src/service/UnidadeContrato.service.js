import axios from "axios";
import { getHeaderToken } from "./auth.service";
import CONFIG from "../configs/config.constants";

export const getUnidadeContrato = uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  return axios
    .get(`${CONFIG.API_URL}/unidades-contratos/${uuid}/`, AUTH_HEADER)
    .then(res => res.data);
};

export const getUnidadesByContrato = uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  return axios
    .get(`${CONFIG.API_URL}/unidades-contratos/?contrato__uuid=${uuid}`, AUTH_HEADER)
    .then(res => res.data);
};

export const addUnidade = payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  return axios
    .post(`${CONFIG.API_URL}/unidades-contratos/`, payload, AUTH_HEADER)
    .then(res => res.data);
};

export const updateUnidade = (payload, uuid) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .put(
      `${CONFIG.API_URL}/unidades-contratos/${uuid}/`,
      payload,
      AUTH_HEADER
    )
    .then(
      res => res.data,
      res => {
        return { statusCode: res.statusCode, result: res };
      }
    );
};
