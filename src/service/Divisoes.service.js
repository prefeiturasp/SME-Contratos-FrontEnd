import api from './Api'
import { getHeaderToken } from "./auth.service";

export const getDivisoes = async () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = 'divisoes/'
  return (await api.get(url, AUTH_HEADER)).data
}

export const getNucleosDaDivisao = async (uuid) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = `divisoes/${uuid}/nucleos/`
  return (await api.get(url, AUTH_HEADER)).data
}

