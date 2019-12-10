import api from './Api'
import { getHeaderToken } from "./auth.service";


export const getUnidades = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return api
    .get('unidades/', AUTH_HEADER)
    .then(res => res.data);
};

export const getUnidade = (codigoEol) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return api
    .get(`unidades/${codigoEol}/`, AUTH_HEADER)
    .then(res => res.data);
};