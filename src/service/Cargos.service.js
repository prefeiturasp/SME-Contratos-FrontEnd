import api from './Api'
import { getHeaderToken } from "./auth.service";

export const getCargosCoad = async () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = 'coad/'
  return (await api.get(url, AUTH_HEADER)).data[0]
}

export const updateCoordenadorCoad = async (coordenador) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = 'coad/1/'
  const payload = {
    coordenador: coordenador.id
  }
  return (await api.patch(url, payload, AUTH_HEADER)).data[0]
}

export const updateAssessoresCoad = (assessores) => {

  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const payload = {
    assessores: assessores
  }

  const url = 'coad/update-assessores/'

  return api.post(url, payload, AUTH_HEADER) 

}

