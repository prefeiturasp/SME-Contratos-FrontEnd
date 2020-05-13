import axios from "axios";
let SAFI_TOKEN = process.env.REACT_APP_SAFI_TOKEN;

export const getEquipamentos = async ({
  nm_equipamento = "",
  cd_equipamento = "",
  dre = "",
  tp_unidade = "",
}) => {
  return await axios.get(
    `https://hom-smecieduapi.sme.prefeitura.sp.gov.br/safi/equipamentos/` +
      `?nm_equipamento=${nm_equipamento}` +
      `&cd_equipamento=${cd_equipamento}` +
      `&dre=${dre}` +
      `&tp_unidade=${tp_unidade}`,
    { headers: { Authorization: SAFI_TOKEN } }
  );
};
