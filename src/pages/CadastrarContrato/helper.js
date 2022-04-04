export const formatarDREs = dres => {
  return dres.map(dre => {
    dre.diretoria = dre.diretoria.replace(
      "DIRETORIA REGIONAL DE EDUCACAO ",
      "",
    );
    return dre;
  });
};

export const formatarUnidades = unidades => {
  return unidades.map(unidade => {
    unidade.checked = false;
    return unidade;
  });
};
