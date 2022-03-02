export const carregaUmContrato = contrato => {
  return {
    type: "GET_UM_CONTRATO",
    contrato,
  };
};
