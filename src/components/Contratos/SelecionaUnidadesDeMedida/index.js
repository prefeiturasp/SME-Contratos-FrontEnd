import React, { Component } from "react";
import { Dropdown } from "primereact/dropdown";
import { getUnidadesDeMedidaLookup } from "../../../service/UnidadesDeMedida.service";

export class SelecionaUnidadesDeMedida extends Component {
  constructor() {
    super();
    this.state = {
      unidades: [],
    };
  }

  async componentDidMount() {
    this.buscaUnidadesDeMedida();
  }

  selecionaUnidadeMedida(event) {
    this.props.onSelect(event.value);
  }

  async buscaUnidadesDeMedida() {
    const unidades = await getUnidadesDeMedidaLookup();
    this.setState({ unidades });
  }

  render() {
    return (
      <Dropdown
        {...this.props}
        optionLabel="nome"
        options={this.state.unidades}
        value={this.props.unidade_medida}
        onChange={event => this.selecionaUnidadeMedida(event)}
        autoWidth={false}
        placeholder="Selecione"
        showClear={true}
      />
    );
  }
}
