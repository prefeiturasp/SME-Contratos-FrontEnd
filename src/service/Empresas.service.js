import { getHeaderToken } from "./auth.service";
import * as CONFIG from "../configs/config.constants";
import api from "./Api";
import { formataParametros } from "../utils/formataParametros";

export const getEmpresa = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `empresas/${uuid}/`;
  return (await api.get(url, AUTH_HEADER)).data;
};

export const getEmpresasLookup = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return api
    .get(`${CONFIG.API_URL}/empresas/lookup/`, AUTH_HEADER)
    .then(res => res.data);
};

export const getEmpresasLookupCompleto = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return api
    .get(`${CONFIG.API_URL}/empresas/lookup_completo/`, AUTH_HEADER)
    .then(res => res.data);
};

export const getListaDeEmpresas = async filtro => {
  let parametros = formataParametros(filtro);
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return (await api.get(`empresas/${parametros}`, AUTH_HEADER)).data;
};

export const criaEmpresa = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = "empresas/";
  return await api.post(url, payload, AUTH_HEADER);
};

export const alteraEmpresa = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `empresas/${payload.uuid}/`;
  return await api.patch(url, payload, AUTH_HEADER);
};
