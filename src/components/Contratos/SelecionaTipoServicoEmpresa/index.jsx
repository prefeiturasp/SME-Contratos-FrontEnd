import React from "react";
import { Dropdown } from "primereact/dropdown";
import { TIPO_SERVICO } from "../../../pages/Empresas/constantes";

function SelecionaTipoServicoEmpresa(props) {
  const selecionaTipoServico = event => {
    props.onSelect(event.value);
  };

  return (
    <Dropdown
      {...props}
      optionLabel="nome"
      options={TIPO_SERVICO}
      value={props.tipoServico}
      onChange={event => selecionaTipoServico(event)}
      autoWidth={false}
      placeholder="Selecione Tipo de Serviço..."
      showClear={true}
    />
  );
}

export default SelecionaTipoServicoEmpresa;
