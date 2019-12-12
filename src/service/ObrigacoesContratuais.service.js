import axios from "axios";
import { getHeaderToken } from "./auth.service";
import CONFIG from "../configs/config.constants";

export const getObrigacaoContratualByContrato = contrato => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  return axios
    .get(
      `${CONFIG.API_URL}/obrigacoes-contratuais/?contrato__uuid=${contrato}`,
      AUTH_HEADER
    )
    .then(res => res.data);
};

export const addObrigacaoContratual = payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };

  return axios
    .post(`${CONFIG.API_URL}/obrigacoes-contratuais/`, payload, AUTH_HEADER)
    .then(res => res.data);
};

export const updateObrigacaoContratual = (payload, uuid) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .put(
      `${CONFIG.API_URL}/obrigacoes-contratuais/${uuid}/`,
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

export const excluirObrigacaoContratual = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return await axios
    .delete(
      `${CONFIG.API_URL}/obrigacoes-contratuais/${uuid}/`,
      AUTH_HEADER
    )
    .catch(err => {
      return false;
    });
};
