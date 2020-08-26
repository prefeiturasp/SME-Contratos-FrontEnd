import React, { Component } from "react";
import { Messages } from "primereact/messages";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Row, Col } from "reactstrap";
import { InputText } from "primereact/inputtext";
import {
  getTermosAll,
  getTermoByAtribuicao,
  updateContrato,
  getContratos
} from "../../../service/Contratos.service";
import { BuscaIncrementalServidores } from "../BuscaIncrementalServidores";
import { Dialog } from "primereact/dialog";

export default class ListarTermoContrato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termos: [],
      atribuicao: "",
      termo_contrato: "",
      gestor: null,
      suplente: null,
      editarVisible: false,
      confirmarVisible: false,
      contratoUuid: null
    };
    this.onClickEditar = this.onClickEditar.bind(this);
  }

  buscaTermos = async () => {
    const termos = await getTermosAll();
    this.setState({ termos });
  };

  updateGestor(servidorGestor) {
    this.setState({ gestor: servidorGestor });
  }

  updateSuplente(servidorSuplente) {
    this.setState({ suplente: servidorSuplente });
  }

  handleClickPesquisar() {
    if (this.state.atribuicao !== "" || this.state.atribuicao.length !== 0) {
      if (isNaN(this.state.atribuicao[0]))
        getTermoByAtribuicao(this.state.atribuicao).then(termos => {
          this.setState({ termos });
        });
      else {
        getContratos({ termo_contrato: this.state.atribuicao }).then(termos => {
          this.setState({ termos });
        });
      }
    } else {
      this.buscaTermos();
    }
  }

  async handleClickConfirmar() {
    const payload = {
      termo_contrato: this.state.termo_contrato,
      gestor: this.state.gestor ? this.state.gestor.uuid : null,
      suplente: this.state.suplente ? this.state.suplente.uuid : null
    };
    const result = await updateContrato(payload, this.state.contratoUuid);
    if (result) {
      this.buscaTermos();
      this.setState({ confirmarVisible: false });
      this.props.mensagemSucessoEdicao();
    }
  }

  onClickEditar(value) {
    this.state.termos.forEach(termo => {
      if (termo.uuid === value) {
        this.setState({
          contratoUuid: termo.uuid,
          termo_contrato: termo.termo_contrato,
          gestor: termo.gestor,
          suplente: termo.suplente
        });
      }
    });
    this.setState({ editarVisible: true });
  }

  actionTemplate(rowData, column) {
    return (
      <div>
        <Button
          label="Editar"
          className="btn-coad-background-outline"
          onClick={event => {
            this.onClickEditar(column.uuid);
          }}
        />
      </div>
    );
  }

  componentDidMount() {
    this.buscaTermos();
  }

  render() {
    let cols = [
      { field: "alterado_em", header: "Data/Hora" },
      { field: "termo_contrato", header: "Nº T.C." },
      { field: "gestor.nome", header: "Gestor(a) de Contrato" },
      { field: "suplente.nome", header: "Suplente de Contrato" },
      { field: "editar", header: "" }
    ];

    let dynamicColumns = cols.map((col, i) => {
      if (col.field !== "editar") {
        return <Column key={col.field} field={col.field} header={col.header} />;
      } else {
        return (
          <Column
            body={this.actionTemplate.bind(this, col)}
            style={{ textAlign: "center", width: "8em" }}
          />
        );
      }
    });

    const footerAlterar = (
      <div>
        <Button
          label="Alterar"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            this.setState({ editarVisible: false, confirmarVisible: true });
          }}
        />
        <Button
          label="Cancelar"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            this.setState({ editarVisible: false });
          }}
          className="btn-coad-background-outline"
        />
      </div>
    );

    const footerConfirmar = (
      <div>
        <Button
          label="Sim"
          style={{ marginRight: ".25em" }}
          onClick={this.handleClickConfirmar.bind(this)}
          className="btn-coad-background-outline"
        />
        <Button
          label="Não"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            this.setState({ confirmarVisible: false, editarVisible: true });
          }}
        />
      </div>
    );

    return (
      <div>
        <Dialog
          header="Confirmar alterações"
          visible={this.state.confirmarVisible}
          style={{ width: "50vw" }}
          footer={footerConfirmar}
          onHide={() => {
            this.setState({ confirmarVisible: false });
          }}
        >
          <p>Deseja confirmar alterações em Termo de Contrato?</p>
        </Dialog>
        <Dialog
          header="Editar Termo de Contrato"
          visible={this.state.editarVisible}
          style={{ width: "50vw" }}
          footer={footerAlterar}
          onHide={() => {
            this.setState({ editarVisible: false });
          }}
        >
          <p>
            Os campos "Gestor(a) de contrato" e "Suplente de Gestor(a) de
            Contrato" podem ser alterados.
            <br />
          </p>
          <Row>
            <Col md={12} lg={5} xl={5}>
              <label htmlFor="termo_contrato">Termo de Contrato</label>
              <br />
              <InputText
                value={this.state.termo_contrato}
                onChange={e =>
                  this.setState({
                    termo_contrato: e.target.value
                  })
                }
                disabled="true"
                placeholder="Ex.: 00/00"
                className="w-100"
              />
            </Col>
            <Col lg={7} xl={7} className="p-fluid">
              <label htmlFor="gestor">Nome Gestor(a) de Contrato</label>
              <br />
              <BuscaIncrementalServidores
                placeholder="Ex.: Nome e sobrenome"
                userName={this.state.gestor ? this.state.gestor.username : ""}
                onUpdate={servidorGestor => this.updateGestor(servidorGestor)}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={5} xl={5}></Col>
            <Col lg={7} xl={7} className="p-fluid">
              <label htmlFor="gestor">Nome Suplente de Contrato</label>
              <br />
              <BuscaIncrementalServidores
                placeholder="Ex.: Nome e sobrenome"
                userName={
                  this.state.suplente ? this.state.suplente.username : ""
                }
                onUpdate={servidorSuplente =>
                  this.updateSuplente(servidorSuplente)
                }
              />
            </Col>
          </Row>
        </Dialog>

        <div style={{ paddingBottom: 10 }}>
          <Messages ref={el => (this.messages = el)}></Messages>
          <Row>
            <Col lg={6} xl={6}>
              <h6 style={{ marginLeft: 15, fontWeight: "bold" }}>
                Últimos Cadastros
              </h6>
            </Col>
            <Col lg={6} xl={6}>
              <div className="p-inputgroup w-75 float-right">
                <InputText
                  value={this.state.atribuicao}
                  onChange={e => this.setState({ atribuicao: e.target.value })}
                  placeholder="Buscar Gestor(a) / Suplente / Termo de contrato"
                  style={{ width: "100%" }}
                />
                <Button
                  icon="pi pi-search"
                  className="p-button"
                  onClick={this.handleClickPesquisar.bind(this)}
                />
              </div>
            </Col>
          </Row>
        </div>
        <DataTable
          value={this.state.termos}
          paginator={true}
          rows={10}
          paginatorTemplate="PrevPageLink PageLinks NextPageLink"
          responsive={true}
        >
          {dynamicColumns}
        </DataTable>
      </div>
    );
  }
}
