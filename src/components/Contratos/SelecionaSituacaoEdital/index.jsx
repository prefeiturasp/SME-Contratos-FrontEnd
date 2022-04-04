import React from "react";
import { Dropdown } from "primereact/dropdown";
import { STATUS_EDITAL } from "../../../pages/Edital/constantes";

function SelecionaSituacaoEdital(props) {
  const selecionaSituacao = event => {
    props.onSelect(event.value);
  };

  return (
    <Dropdown
      {...props}
      optionLabel="nome"
      options={STATUS_EDITAL}
      value={props.situacao}
      onChange={event => selecionaSituacao(event)}
      autoWidth={false}
      placeholder="Selecione uma Situação..."
      showClear={true}
    />
  );
}

export default SelecionaSituacaoEdital;
