import React, { Component } from "react";
import { Dropdown } from "primereact/dropdown";
import { getListaDeEditais } from "../../../service/EditaisLista.service";

export class SelecionaEdital extends Component {
  constructor() {
    super();
    this.state = {
      editais: [],
    };
  }

  async componentDidMount() {
    this.buscaEditais();
  }

  SelecionaEdital(event) {
    this.props.onSelect(event.value);
  }

  async buscaEditais() {
    const editais = await getListaDeEditais();
    this.setState({ editais });
  }

  render() {
    return (
      <Dropdown
        {...this.props}
        optionLabel="numero"
        options={this.state.editais}
        value={this.props.editalSalvo}
        onChange={event => this.SelecionaEdital(event)}
        autoWidth={false}
        placeholder="Selecione um Edital..."
        showClear={true}
      />
    );
  }
}
