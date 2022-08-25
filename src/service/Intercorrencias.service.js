import { getHeaderToken } from "./auth.service";
import * as CONFIG from "../configs/config.constants";
import Api from "./Api";

export const createIntercorrencia = payLoad => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.post(`${CONFIG.API_URL}/intercorrencias/`, payLoad, AUTH_HEADER)
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

export const getMotivosIntercorrencia = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(
    `${CONFIG.API_URL}/intercorrencias/motivos-suspensao/`,
    AUTH_HEADER,
  ).then(res => res.data);
};
