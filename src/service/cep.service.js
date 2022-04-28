export const getEnderecoPorCEP = async cep => {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  let status = 0;
  return fetch(url)
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error;
    });
};
