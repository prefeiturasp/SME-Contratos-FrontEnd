import { getHeaderToken } from "./auth.service";
import api from "./Api";
import { formataParametros } from "../utils/formataParametros";

export const getEquipamentos = async filtro => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  let parametros = formataParametros(filtro);
  const url = `equipamentos/${parametros}`;
  return (await api.get(url, AUTH_HEADER)).data.slice(0, 100);
};
