import { getHeaderToken } from "./auth.service";
import * as CONFIG from "../configs/config.constants";
import Api from "./Api";
import { formataParametros } from "../utils/formataParametros";

export function getContratos(filtro) {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };

  let parametros = formataParametros(filtro);

  return Api.get(`${CONFIG.API_URL}/contratos/${parametros}`, AUTH_HEADER).then(
    res => {
      return res.data;
    },
  );
}

export const createAditamento = payLoad => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.post(`${CONFIG.API_URL}/aditamentos/`, payLoad, AUTH_HEADER)
    .then(
      res => res.data,
      res => {
        return { statusCode: res.statusCode, result: res };
      },
    )
    .catch(error => {
      return { error: error };
    });
};

export const excluiAditamento = async uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `aditamentos/${uuid}/`;
  return await Api.delete(url, AUTH_HEADER).catch(() => {
    return false;
  });
};

export const alteraAditamento = async payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = `aditamentos/${payload.uuid}/`;
  return await Api.put(url, payload, AUTH_HEADER);
};

export const getObjetosAditamentos = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(`${CONFIG.API_URL}/aditamentos/objetos/`, AUTH_HEADER).then(
    res => res.data,
  );
};

export default getContratos;
