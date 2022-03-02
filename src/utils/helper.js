export const comNomeUnico = empresas => {
  const nomes = [];
  return empresas.reduce((acc, empresa) => {
    const nome = empresa.nome;
    const count = nomes.filter(el => el === nome).length;
    if (count > 0) {
      empresa.nome = `${nome} (${count + 1})`;
    }
    nomes.push(nome);
    acc.push(empresa);
    return acc;
  }, []);
};
