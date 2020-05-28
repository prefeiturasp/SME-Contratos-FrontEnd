import api from "./Api";
import { getHeaderToken } from "./auth.service";
import moment from "moment";


const formataData = datas => {
  return datas.map(data => ({
    ...data,
    criado_em: data.criado_em
      ? moment(data.criado_em).format("DD/MM/YY - HH:mm")
      : ""
  }));
};

export const getEdital = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = `editais/${uuid}/`;
  return (await api.get(url, AUTH_HEADER)).data;
};

export const getListaDeEditais = async () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = "edital";
  return formataData((await api.get(url, AUTH_HEADER)).data);
};

export const criaEdital = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = "editais/";
  return await api.post(url, payload, AUTH_HEADER);
};

export const alteraEdital = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = `editais/${payload.uuid}/`;
  return await api.patch(url, payload, AUTH_HEADER);
};

export const excluiEdital = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = `editais/${uuid}/`;
  return await api.delete(url, AUTH_HEADER).catch(err => {
    return false;
  });
};
