import Axios from "axios";
import * as CONFIG from "../configs/config.constants";

export const getListaDREs = () => {
  return Axios.get(
    `${CONFIG.SIGPAE_API_URL}/diretorias-regionais-simplissima/lista-completa/`,
  ).then(res => res.data);
};

export const getListSubprefeituras = () => {
  return Axios.get(
    `${CONFIG.SIGPAE_API_URL}/subprefeituras/lista-completa/`,
  ).then(res => res.data);
};
