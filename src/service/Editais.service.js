import api from "./Api";
import { getHeaderToken } from "./auth.service";
import { formataParametros } from "../utils/formataParametros";

export const getEdital = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `editais/${uuid}/`;
  return (await api.get(url, AUTH_HEADER)).data;
};

export const getListaDeEditais = async (filtro) => {
  let parametros = formataParametros(filtro);
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return (await api.get(`editais/${parametros}`, AUTH_HEADER)).data;
};

export const criaEdital = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = "editais/";
  return await api.post(url, payload, AUTH_HEADER);
};

export const alteraEdital = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `editais/${payload.uuid}/`;
  return await api.patch(url, payload, AUTH_HEADER);
};

export const excluiEdital = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `editais/${uuid}/`;
  return await api.delete(url, AUTH_HEADER).catch(() => {
    return false;
  });
};
