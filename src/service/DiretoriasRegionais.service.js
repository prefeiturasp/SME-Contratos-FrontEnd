import axios from "axios";

export const getDiretoriasRegionais = async () => {
  return await axios.get(
    "https://escolaaberta.sme.prefeitura.sp.gov.br/api/diretorias/"
  );
};
