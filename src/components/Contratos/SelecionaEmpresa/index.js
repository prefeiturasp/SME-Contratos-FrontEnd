import React, { Component } from "react";
import { Dropdown } from "primereact/dropdown";
import { getEmpresasLookup } from "../../../service/Empresas.service";

export class SelecionaEmpresa extends Component {
  constructor() {
    super();
    this.state = {
      empresas: [],
    };
  }

  async componentDidMount() {
    this.buscaEmpresas();
  }

  selecionaEmpresa(event) {
    this.props.onSelect(event.value);
  }

  async buscaEmpresas() {
    const empresas = await getEmpresasLookup();
    this.setState({ empresas });
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
