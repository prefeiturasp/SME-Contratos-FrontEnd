import api from "./Api";
import { getHeaderToken } from "./auth.service";
import { formataParametros } from "../utils/formataParametros";

export const getProduto = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `produtos/${uuid}/`;
  return (await api.get(url, AUTH_HEADER)).data;
};

export const getListaDeProdutos = async filtro => {
  let parametros = formataParametros(filtro);
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return (await api.get(`produtos/${parametros}`, AUTH_HEADER)).data;
};

export const getProdutosSimples = async filtro => {
  let parametros = formataParametros(filtro);
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return (await api.get(`produtos/simples/${parametros}`, AUTH_HEADER)).data;
};

export const criaProduto = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = "produtos/";
  return await api.post(url, payload, AUTH_HEADER);
};

export const alteraProduto = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `produtos/${payload.uuid}/`;
  return await api.patch(url, payload, AUTH_HEADER);
};

export const excluiProduto = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `produtos/${uuid}/`;
  return await api.delete(url, AUTH_HEADER).catch(() => {
    return false;
  });
};
