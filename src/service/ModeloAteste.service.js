import api from "./Api";
import { getHeaderToken } from "./auth.service";
import moment from "moment";

export const getModeloAteste = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = `modelo-ateste/${uuid}/`
  return (await api.get(url, AUTH_HEADER)).data;
};

export const getModeloAtesteLookup = async () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = "modelo-ateste/titulos-modelo-ateste/";
  return formataData((await api.get(url, AUTH_HEADER)).data);
};

export const criaModeloAteste = async (payload) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = "modelo-ateste/";
  return await (api.post(url, payload, AUTH_HEADER));
};

export const alteraModeloAteste = async (payload) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = `modelo-ateste/${payload.uuid}/`;
  return await (api.patch(url, payload, AUTH_HEADER));
};

const formataData = datas => {
  return datas.map(data => ({
    ...data,
    criado_em: data.criado_em
      ? moment(data.criado_em).format("DD/MM/YY - HH:mm")
      : ""
  }));
};
