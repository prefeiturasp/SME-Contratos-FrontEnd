export const formatadoMonetario = valor => {
  const formater = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return formater.format(valor);
};
