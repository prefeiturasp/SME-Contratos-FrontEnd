import axios from "axios";
import { getHeaderToken, getUsuario } from "./auth.service";
import CONFIG from "../configs/config.constants";


export function getContratos() {
  const AUTH_HEADER = {
    headers : getHeaderToken()
  }
  return axios.get(`${CONFIG.API_URL}/contratos/`, AUTH_HEADER).then(res => res.data);
}

export function getMeusContratos() {
  const AUTH_HEADER = {
    headers : getHeaderToken()
  }
  return axios
    .get(`${CONFIG.API_URL}/contratos/?gestor=${getUsuario().user_id}`, AUTH_HEADER)
    .then(res => res.data);
}

export default getContratos;
