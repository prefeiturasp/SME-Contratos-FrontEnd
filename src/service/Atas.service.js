import api from "./Api";
import { getHeaderToken } from "./auth.service";
import { formataParametros } from "../utils/formataParametros";

export const getAta = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `atas/${uuid}/`;
  return (await api.get(url, AUTH_HEADER)).data;
};

export const getListaDeEditais = async filtro => {
  let parametros = formataParametros(filtro);
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return (await api.get(`atas/${parametros}`, AUTH_HEADER)).data;
};

export const criaAta = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = "atas/";
  return await api.post(url, payload, AUTH_HEADER);
};

export const alteraAta = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `atas/${payload.uuid}/`;
  return await api.patch(url, payload, AUTH_HEADER);
};

export const excluiAta = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `atas/${uuid}/`;
  return await api.delete(url, AUTH_HEADER).catch(() => {
    return false;
  });
};
