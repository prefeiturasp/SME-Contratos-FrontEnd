import React from "react";
import { Dropdown } from "primereact/dropdown";
import { TIPO_FORNECEDOR } from "../../../pages/Empresas/constantes";

function SelecionaTipoFornecedorEmpresa(props) {
  const selecionaTipoFornecedor = event => {
    props.onSelect(event.value);
  };

  return (
    <Dropdown
      {...props}
      optionLabel="nome"
      options={TIPO_FORNECEDOR}
      value={props.tipoFornecedor}
      onChange={event => selecionaTipoFornecedor(event)}
      autoWidth={false}
      placeholder="Selecione Tipo de Fornecedor..."
      showClear={true}
    />
  );
}

export default SelecionaTipoFornecedorEmpresa;
