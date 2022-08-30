import { getHeaderToken } from "./auth.service";
import * as CONFIG from "../configs/config.constants";
import Api from "./Api";

export const createIntercorrencia = payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.post(
    `${
      CONFIG.API_URL
    }/intercorrencias/${payload.tipo_intercorrencia.toLowerCase()}/`,
    payload,
    AUTH_HEADER,
  )
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

export const createAnexoIntercorrencia = payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  AUTH_HEADER.headers["Content-Type"] = "multipart/form-data";
  return Api.post(
    `${CONFIG.API_URL}/intercorrencias/anexos-impedimento/`,
    payload,
    AUTH_HEADER,
  )
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

export const getMotivosSuspensaoIntercorrencia = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(
    `${CONFIG.API_URL}/intercorrencias/suspensao/motivos-suspensao/`,
    AUTH_HEADER,
  ).then(res => res.data);
};

export const getMotivosRescisaoIntercorrencia = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(
    `${CONFIG.API_URL}/intercorrencias/rescisao/motivos-rescisao/`,
    AUTH_HEADER,
  ).then(res => res.data);
};
