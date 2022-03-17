import React, { Component } from "react";
import { Dropdown } from "primereact/dropdown";
import { getTiposServicoLookup } from "../../../service/TiposServico.service";

export class SelecionaTipoServico extends Component {
  constructor() {
    super();
    this.state = {
      tiposServico: [],
    };
  }

  async componentDidMount() {
    this.buscaTiposServico();
  }

  selecionaTipoServico(event) {
    this.props.onSelect(event.value);
  }

  async buscaTiposServico() {
    const tiposServico = await getTiposServicoLookup();
    this.setState({ tiposServico });
  }

  render() {
    return (
      <Dropdown
        {...this.props}
        optionLabel="nome"
        options={this.state.tiposServico}
        value={this.props.tipoServico}
        onChange={event => this.selecionaTipoServico(event)}
        autoWidth={false}
        placeholder="Selecione um Objeto..."
        showClear={true}
      />
    );
  }
}
