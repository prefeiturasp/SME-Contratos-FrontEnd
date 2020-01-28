import api from './Api'
import { getHeaderToken } from "./auth.service";

export const getMinhasNotificacoesVigenciaContratos = async () => {
  const AUTH_HEADER = {
    headers: getHeaderToken()
  };
  const url = 'minhas-notificacoes-vigencia-contratos/'
  return (await api.get(url, AUTH_HEADER)).data
}

