export const formataParametros = filtro => {
  let parametros = "";
  for (let prop in filtro) {
    if (Object.prototype.hasOwnProperty.call(filtro, prop)) {
      if (filtro[prop]) {
        let prefix = parametros ? "&" : "?";
        parametros += `${prefix}${prop}=${filtro[prop]}`;
      }
    }
  }
  return parametros;
};
