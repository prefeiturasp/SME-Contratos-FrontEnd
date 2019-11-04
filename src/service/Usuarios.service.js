import axios from "axios";
import { getHeaderToken, getUsuario } from "./auth.service";
import CONFIG from "../configs/config.constants";

export const getUsuariosLookup = () => {
    const AUTH_HEADER = {
        headers: getHeaderToken()
      };
    return axios.get(`${CONFIG.API_URL}/usuarios/lookup/`, AUTH_HEADER).then(res => res.data)
}

export const getUsuarioByUserName = (userName) => {
  const AUTH_HEADER = {
      headers: getHeaderToken()
    };
  return axios.get(`${CONFIG.API_URL}/usuarios/${userName}/`, AUTH_HEADER).then(res => res.data)
}

export function getMeuProfile() {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  return axios
    .get(
      `${CONFIG.API_URL}/usuarios/${getUsuario().username}/`,
      AUTH_HEADER
    )
    .then(res => res.data);
}