import { getHeaderToken } from "./auth.service";
import * as CONFIG from "../configs/config.constants";
import api from "./Api";
import { formataParametros } from "../utils/formataParametros";

export const getEmpresasLookup = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return api
    .get(`${CONFIG.API_URL}/empresas/lookup/`, AUTH_HEADER)
    .then(res => res.data);
};

export const getListaDeEmpresas = async filtro => {
  let parametros = formataParametros(filtro);
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return (await api.get(`empresas/${parametros}`, AUTH_HEADER)).data;
};
