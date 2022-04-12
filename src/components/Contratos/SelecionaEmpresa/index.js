import React, { Component } from "react";
import { Dropdown } from "primereact/dropdown";
import { getEmpresasLookup } from "../../../service/Empresas.service";
import { comNomeUnico } from "../../../utils/helper";

export class SelecionaEmpresa extends Component {
  constructor() {
    super();
    this.state = {
      empresas: [],
    };
  }

  async componentDidMount() {
    const empresas = await getEmpresasLookup();
    this.setState({ empresas: comNomeUnico(empresas) });
  }

  selecionaEmpresa(event) {
    this.setState({ empresaSelecionada: event.value });
    this.props.onSelect(event.value);
  }

  render() {
    return (
      <Dropdown
        {...this.props}
        optionLabel="nome"
        options={this.state.empresas}
        value={this.props.empresa}
        onChange={event => this.selecionaEmpresa(event)}
        autoWidth={false}
        placeholder="Selecione uma Empresa..."
        showClear={true}
        emptyFilterMessage={"Nenhuma empresa encontrada"}
      />
    );
  }
}
