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
    const tiposServico = await getTiposServicoLookup();
    this.setState({ tiposServico });
  }

  selecionaTipoServico(event) {
    this.props.onSelect(event.value);
  }

  render() {
    const { disabilitado } = this.props;
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
        disabled={disabilitado}
      />
    );
  }
}
