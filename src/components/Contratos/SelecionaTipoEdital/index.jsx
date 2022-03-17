import React from "react";
import { Dropdown } from "primereact/dropdown";
import { TIPOS_CONTRATACAO } from "../../../pages/Edital/constantes";

function SelecionaTipoEdital(props) {
  const selecionaTipo = event => {
    props.onSelect(event.value);
  };

  return (
    <Dropdown
      {...props}
      optionLabel="nome"
      options={TIPOS_CONTRATACAO}
      value={props.situacao}
      onChange={event => selecionaTipo(event)}
      autoWidth={false}
      placeholder="Selecione um Tipo de Contratação"
      showClear={true}
    />
  );
}

export default SelecionaTipoEdital;
