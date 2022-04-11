import React, { Component } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputMask } from "primereact/inputmask";

import { SelecionaEmpresa } from "../SelecionaEmpresa";
import { SelecionaSituacaoContrato } from "../SelecionaSituacaoContrato";
import { SelecionaTipoServico } from "../SelecionaTipoServico";
import { SelecionaData } from "../SelecionaData";

import "./style.scss";

export class BuscaContratosForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empresa: "",
      status: "",
      data_inicial: "",
      data_final: "",
      termo_contrato: "",
      objeto: "",
      cnpj_empresa: "",
    };
  }

  setaEmpresa(empresa) {
    this.setState({ empresa: empresa });
  }

  setaSituacao(situacao) {
    this.setState({ status: situacao });
  }

  setaTipoServico(tipoServico) {
    this.setState({ objeto: tipoServico });
  }

  setaDataInicialContrato(dataInicial) {
    if (dataInicial) {
      this.setState({ data_inicial: dataInicial });
    }
  }

  setaDataFinalContrato(dataFinal) {
    if (dataFinal) {
      this.setState({ data_final: dataFinal });
    }
  }

  handleClickBuscar() {
    this.props.onBuscarClick(this.state);
  }

  limparFiltros() {
    this.setState({
      empresa: "",
      status: "",
      equipamento: "",
      data_inicial: "",
      data_final: "",
      termo_contrato: "",
      cnpj_empresa: "",
      objeto: "",
    });
  }

  render() {
    const footer = (
      <span>
        <Button
          className="float-right"
          label="Consultar"
          style={{ marginRight: ".25em" }}
          onClick={this.handleClickBuscar.bind(this)}
        />
        <Button
          className="float-right"
          label="Limpar Filtros"
          style={{ marginRight: ".25em" }}
          onClick={this.limparFiltros.bind(this)}
        />
      </span>
    );

    return (
      <Card footer={footer} className="filtro filtroBorda">
        <div className="p-grid p-fluid">
          <div className="card card-w-title filtro">
            <div className="p-grid">
              <div className="p-col-6">
                <h6>Nº do Termo de Contrato</h6>
                <InputMask
                  mask="********/9999"
                  value={this.state.termo_contrato}
                  onChange={e =>
                    this.setState({ termo_contrato: e.target.value })
                  }
                  autoClear={false}
                  placeholder="Informe o nº do termo de contrato"
                />
              </div>

              <div className="p-col-6">
                <h6>Nome da empresa</h6>
                <SelecionaEmpresa
                  empresa={this.state.empresa}
                  onSelect={this.setaEmpresa.bind(this)}
                />
              </div>

              <div className="p-col-6">
                <h6>CNPJ da empresa</h6>
                <InputMask
                  mask="99.999.999/9999-99"
                  value={this.state.cnpj_empresa}
                  onChange={e =>
                    this.setState({ cnpj_empresa: e.target.value })
                  }
                  autoClear={false}
                  placeholder="Informe o CNPJ"
                />
              </div>

              <div className="p-col-6">
                <h6>Período de Encerramento</h6>
                <div className="p-grid">
                  <div className="p-col-6">
                    <SelecionaData
                      placeholder={"De"}
                      data={this.state.data_inicial}
                      maxDate={this.state.data_final}
                      onSelect={this.setaDataInicialContrato.bind(this)}
                    />
                  </div>
                  <div className="p-col-6">
                    <SelecionaData
                      placeholder={"Até"}
                      data={this.state.data_final}
                      minDate={this.state.data_inicial}
                      onSelect={this.setaDataFinalContrato.bind(this)}
                    />
                  </div>
                </div>
              </div>

              <div className="p-col-6">
                <h6>Status</h6>
                <SelecionaSituacaoContrato
                  situacao={this.state.status}
                  onSelect={this.setaSituacao.bind(this)}
                />
              </div>

              <div className="p-col-6 ">
                <h6>Objeto</h6>
                <SelecionaTipoServico
                  tipoServico={this.state.objeto}
                  onSelect={this.setaTipoServico.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
