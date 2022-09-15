export const mascaraTelefoneOuCelular = telefone => {
  let fone = telefone
    .replace(/[()]/g, "")
    .replace("-", "")
    .replace("_", "")
    .replace(" ", "");
  const ehCelular = fone.length === 11;

  if (ehCelular) return fone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  else return fone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
};
