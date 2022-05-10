import { formataParametros } from "../utils/formataParametros";
import api from "./Api";
import { getHeaderToken } from "./auth.service";

export const getListaDotacoes = async filtro => {
  let parametros = formataParametros(filtro);
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return (await api.get(`dotacoes-orcamentarias/${parametros}`, AUTH_HEADER))
    .data;
};

export const getDotacaoOrcamentaria = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `dotacoes-orcamentarias/${uuid}/`;
  return (await api.get(url, AUTH_HEADER)).data;
};

export const criaDotacaoOrcamentaria = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = "dotacoes-orcamentarias/";
  return await api.post(url, payload, AUTH_HEADER);
};

export const alteraDotacaoOrcamentaria = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `dotacoes-orcamentarias/${payload.uuid}/`;
  return await api.patch(url, payload, AUTH_HEADER);
};

export const excluiDotacaoOrcamentaria = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `dotacoes-orcamentarias/${uuid}/`;
  return await api.delete(url, AUTH_HEADER).catch(() => {
    return false;
  });
};
