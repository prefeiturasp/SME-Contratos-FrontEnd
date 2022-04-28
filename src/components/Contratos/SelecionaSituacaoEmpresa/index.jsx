import React from "react";
import { Dropdown } from "primereact/dropdown";
import { SITUACAO_EMPRESA } from "../../../pages/Empresas/constantes";

function SelecionaSituacaoEmpresa(props) {
  const selecionaSituacao = event => {
    props.onSelect(event.value);
  };

  return (
    <Dropdown
      {...props}
      optionLabel="nome"
      options={SITUACAO_EMPRESA}
      value={props.situacao}
      onChange={event => selecionaSituacao(event)}
      autoWidth={false}
      placeholder="Selecione uma Situação..."
      showClear={true}
    />
  );
}

export default SelecionaSituacaoEmpresa;
