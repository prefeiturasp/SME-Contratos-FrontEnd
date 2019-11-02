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

export const getCargosDivisao = async (uuid) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = `divisoes/${uuid}/`
  return (await api.get(url, AUTH_HEADER)).data[0]
}

export const updateCargosDivisao = async (uuid, diretor, suplente) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = `divisoes/${uuid}/`
  const payload = {
    diretor: diretor.id,
    suplente_diretor: suplente.id
  }
  return (await api.patch(url, payload, AUTH_HEADER)).data[0]
}

export const getCargosNucleo = async (uuid) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = `nucleos/${uuid}/`
  return (await api.get(url, AUTH_HEADER)).data[0]
}

export const updateCargosNucleo = async (uuid, chefe, suplente) => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = `nucleos/${uuid}/`
  const payload = {
    chefe: chefe.id,
    suplente_chefe: suplente.id
  }
  return (await api.patch(url, payload, AUTH_HEADER)).data[0]
}