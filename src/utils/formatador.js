export const formatadoMonetario = valor => {
  const formater = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return formater.format(valor);
};

export const formatadorDeData = data => {
  const formatter = new Intl.DateTimeFormat("pt-BR");
  const date = convertStringToDate(data);
  return formatter.format(date);
};

<<<<<<< HEAD
const convertStringToDate = data => {
  const date = data.split("-");
  data = new Date(date[0], date[1] - 1, date[2]);
  return data;
};
=======
const convertStringToDate = data =>{
  const date = data.split('-');
  return new Date(date[0],date[1]-1, date[2])
}
>>>>>>> 0.2.1
