import axios from "axios";
import { getHeaderToken } from "./auth.service";
import * as CONFIG from "../configs/config.constants";
import api from "./Api";

export const getSafiToken = () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  return api
    .get(`${CONFIG.API_URL}/safi-token/`, AUTH_HEADER)
    .then(res => res.data);
};

export const getEquipamentos = async ({
  nm_equipamento = "",
  cd_equipamento = "",
  dre = "",
  tp_unidade = "",
  tp_unidade_escolar = "",
}) => {
  const response = await getSafiToken();
  return await axios.get(
    `${CONFIG.SAFI_EQUIPAMENTOS_API_URL}` +
      `?nm_equipamento=${nm_equipamento}` +
      `&cd_equipamento=${cd_equipamento}` +
      `&dre=${dre}` +
      `&tp_unidade=${tp_unidade_escolar || tp_unidade}`,
    { headers: { Authorization: response.safi_token } },
  );
};
