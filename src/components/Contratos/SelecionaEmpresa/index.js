import React, { Component } from "react";
import { Dropdown } from "primereact/dropdown";
import { getEmpresasLookup } from "../../../service/Empresas.service";

export class SelecionaEmpresa extends Component {
  constructor() {
    super();
    this.state = {
      empresas: [],
      empresaSelecionada: null
    };
  }

  async componentDidMount() {
    const empresas = await getEmpresasLookup();
    const nomes = [];
    const comNomeUnico = empresas.reduce((acc, empresa) => {
      const nome = empresa.nome;
      const count = nomes.filter(el => el === nome).length
      if(count > 0) {
        empresa.nome = `${nome} (${count+1})`
      }
      nomes.push(nome)
      acc.push(empresa)
      return acc;
    }, [])
    this.setState({ empresas: comNomeUnico, empresaSelecionada: this.props.selecionada });
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
        value={this.props.selecionada}
        onChange={event => this.selecionaEmpresa(event)}
        autoWidth={false}
        placeholder="Selecione uma Empresa..."
        showClear={true}
        className="pb-1"
      />
    );
  }
}
