import React from "react";
import { Dropdown } from "primereact/dropdown";
import { STATUS_ATA } from "../../../pages/Atas/constantes";

function SelecionaSituacaoAta(props) {
  const selecionaSituacao = event => {
    props.onSelect(event.value);
  };

  return (
    <Dropdown
      {...props}
      optionLabel="nome"
      options={STATUS_ATA}
      value={props.situacao}
      onChange={event => selecionaSituacao(event)}
      autoWidth={false}
      placeholder="Selecione uma Situação..."
      showClear={true}
    />
  );
}

export default SelecionaSituacaoAta;
