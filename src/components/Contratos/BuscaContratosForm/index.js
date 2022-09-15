import React, { Component } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputMask } from "primereact/inputmask";

import { SelecionaEmpresa } from "../SelecionaEmpresa";
import { SelecionaSituacaoContrato } from "../SelecionaSituacaoContrato";
import { SelecionaTipoServico } from "../SelecionaTipoServico";
import { SelecionaData } from "../SelecionaData";
import { InputText } from "primereact/inputtext";
import "./style.scss";
import { redirect } from "../../../utils/redirect";
import { Col, Row } from "reactstrap";

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
      this.setState({ data_inicial: dataInicial.value });
    }
  }

  setaDataFinalContrato(dataFinal) {
    if (dataFinal) {
      this.setState({ data_final: dataFinal.value });
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
      <Row>
        <Col lg={12} xl={6} className="float-left">
          <span className="float-left">
            <Button
              icon="pi pi-file"
              label="Novo Contrato"
              style={{ marginBottom: ".80em", marginRight: ".5em" }}
              className="btn-coad-background-outline"
              onClick={() => {
                redirect(`#/visualizar-contrato/`);
              }}
            />
          </span>
        </Col>
        <Col lg={12} xl={6}>
          <span>
            <Button
              className="float-right"
              label="Filtrar"
              style={{ marginRight: ".5em" }}
              onClick={this.handleClickBuscar.bind(this)}
            />
            <Button
              className="float-right"
              label="Limpar Filtros"
              style={{ marginRight: ".25em" }}
              onClick={this.limparFiltros.bind(this)}
            />
          </span>
        </Col>
      </Row>
    );

    return (
      <Card footer={footer} className="filtro filtroBorda">
        <div className="p-grid contrato-grid p-fluid">
          <div className="card card-w-title-contrato filtro">
            <div className="p-grid contrato-grid ">
              <div className="p-col-6">
                <h6>Nº do Termo de Contrato</h6>
                <InputText
                  id="termoContrato"
                  value={this.state.termo_contrato}
                  onChange={e =>
                    this.setState({ termo_contrato: e.target.value })
                  }
                  placeholder="00/SME/CODAE/0000"
                  autoClear={false}
                />
              </div>

              <div className="p-col-6 no-padding-right">
                <h6>Nome da Empresa</h6>
                <SelecionaEmpresa
                  campo="nome"
                  empresa={this.state.empresa}
                  onSelect={this.setaEmpresa.bind(this)}
                  filter
                />
              </div>

              <div className="p-col-6">
                <h6>CNPJ da Empresa</h6>
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

              <div className="p-col-6 no-padding-right">
                <h6>Período de Encerramento</h6>
                <div className="p-grid ml-0">
                  <div className="p-col-6 no-padding-left">
                    <SelecionaData
                      placeholder={"De"}
                      data={this.state.data_inicial}
                      maxDate={this.state.data_final}
                      onSelect={this.setaDataInicialContrato.bind(this)}
                    />
                  </div>
                  <div className="p-col-6 no-padding-right">
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

              <div className="p-col-6 no-padding-right">
                <h6>Objeto</h6>
                <SelecionaTipoServico
                  tipoServico={this.state.objeto}
                  onSelect={this.setaTipoServico.bind(this)}
                  filter
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
