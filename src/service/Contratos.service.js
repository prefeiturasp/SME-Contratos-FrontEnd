import { getHeaderToken, getUsuario } from "./auth.service";
import * as CONFIG from "../configs/config.constants";
import moment from "moment";
import Api from "./Api";

export function getContratos(filtro) {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };

  let parametros = "";
  for (var prop in filtro) {
    if (Object.prototype.hasOwnProperty.call(filtro, prop)) {
      if (filtro[prop]) {
        let prefix = parametros ? "&" : "?";
        parametros += `${prefix}${prop}=${filtro[prop]}`;
      }
    }
  }

  return Api.get(`${CONFIG.API_URL}/contratos/${parametros}`, AUTH_HEADER).then(
    res => {
      return res.data;
    },
  );
}

export function getMeusContratos() {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(
    `${CONFIG.API_URL}/contratos/?gestor=${getUsuario().user_id}`,
    AUTH_HEADER,
  ).then(res => res.data);
}

export const getContratoByUUID = uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };

  return Api.get(`${CONFIG.API_URL}/contratos/${uuid}/`, AUTH_HEADER).then(
    res => res.data,
  );
};

export function getTermo(termo) {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(
    `${CONFIG.API_URL}/contratos/?termo_contrato=${termo}`,
    AUTH_HEADER,
  ).then(res => res.data);
}

export function getTermoByAtribuicao(atribuicao) {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(
    `${CONFIG.API_URL}/contratos/?atribuido=${atribuicao}`,
    AUTH_HEADER,
  ).then(res => {
    return formataDataCriacao(res.data);
  });
}

export function getTermosAll() {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(`${CONFIG.API_URL}/contratos/termos/`, AUTH_HEADER).then(
    res => {
      return formataDataCriacao(res.data);
    },
  );
}

const formataDataCriacao = datas => {
  return datas.map(data => ({
    ...data,
    alterado_em: moment(data.alterado_em).format("DD/MM/YY - HH:mm:ss"),
  }));
};

export const getSituacoesContrato = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(`${CONFIG.API_URL}/contratos/situacoes/`, AUTH_HEADER).then(
    res => res.data,
  );
};

export const getEstadosContrato = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(`${CONFIG.API_URL}/contratos/estados/`, AUTH_HEADER).then(
    res => res.data,
  );
};

export const getCamposContrato = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.get(
    `${CONFIG.API_URL}/colunas-contrato/?usuario=${getUsuario().user_id}`,
    AUTH_HEADER,
  ).then(res => res.data);
};

export const createContrato = payLoad => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.post(`${CONFIG.API_URL}/contratos/`, payLoad, AUTH_HEADER)
    .then(
      res => res.data,
      res => {
        return { statusCode: res.statusCode, result: res };
      },
    )
    .catch(error => {
      return { error: error };
    });
};

export const updateColunasContrato = payload => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };

  return Api.patch(
    `${CONFIG.API_URL}/colunas-contrato/${payload.uuid}/`,
    payload,
    AUTH_HEADER,
  )
    .then(
      res => res.data,
      res => {
        return { statusCode: res.statusCode, result: res };
      },
    )
    .catch(error => {
      return { error: error };
    });
};

export const updateContrato = async (payload, contratoUuid) => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const response = Api.put(
    `${CONFIG.API_URL}/contratos/${contratoUuid}/`,
    payload,
    AUTH_HEADER,
  );
  return response;
};
export const CancelarContrato = uuid => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return Api.delete(
    `${CONFIG.API_URL}/contratos/${uuid}/cancelar-cadastro-unico/`,
    AUTH_HEADER,
  )
    .then(
      res => res.data,
      res => {
        return { statusCode: res.statusCode, result: res };
      },
    )
    .catch(error => {
      return { error: error };
    });
};

export default getContratos;
