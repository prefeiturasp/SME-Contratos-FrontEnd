import { getContratoByUUID } from "../../../service/Contratos.service";

export const carregaUmContrato = contrato => {
  return {
    type: "GET_UM_CONTRATO",
    contrato,
  };
};
