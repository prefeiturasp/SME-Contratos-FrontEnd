export const formatadoMonetario = valor => {
  const formater = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return formater.format(valor);
};

export const formatadorDeData = data => {
  if (data === undefined || data === null) {
    return data;
  } else {
    const formatter = new Intl.DateTimeFormat("pt-BR");
    const date = convertStringToDate(data);
    return formatter.format(date);
  }
};

const convertStringToDate = data => {
  const date = data.split("-");
  return new Date(date[0], date[1]-1, date[2]);
};
