import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Row, Col } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import {
  getObrigacaoContratualByContrato,
  addObrigacaoContratual
} from "../../../service/ObrigacoesContratuais.service";
import { Dialog } from "primereact/dialog";

export default class ListarObrigacoesContratuais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obrigacoes: [],
      uuid: null,
      contrato: null,
      item: "",
      obrigacao: "",
      adicionarVisible: false
    };
  }
  salvaObrigacao() {
    const payload = {
      contrato: this.state.contrato,
      item: this.state.item,
      obrigacao: this.state.obrigacao
    };
    addObrigacaoContratual(payload);
  }

  onClickEditar(value) {
    this.state.obrigacoes.forEach(obrigacao => {
      if (obrigacao.uuid === value) {
        this.setState({
          uuid: obrigacao.uuid,
          contrato: obrigacao.contrato.uuid,
          item: obrigacao.item,
          obrigacao: obrigacao.obrigacao
        });
      }
    });
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

  renderHeader() {
    return (
      <div>
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="bullet"></button>
          <button className="ql-list" value="ordered"></button>
        </span>
      </div>
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.contrato !== this.props.contrato) {
      this.setState({ contrato: this.props.contrato });
      this.setState({
        obrigacoes: await getObrigacaoContratualByContrato(this.props.contrato)
      });
    }
  }

  render() {
    let footerSemObrigacoes =
      "Não existem obrigações contratuais adicionadas no contrato";

    let cols = [
      { field: "item", header: "Item", width: "20%" },
      { field: "obrigacao", header: "Obrigações" },
      { field: "editar", header: "" }
    ];

    let dynamicColumns = cols.map((col, i) => {
      switch (col.field) {
        case "item":
          return (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              style={{ width: "10%" }}
            />
          );
        case "editar":
          return (
            <Column
              body={this.actionTemplate.bind(this, col)}
              style={{ textAlign: "center", width: "8em" }}
            />
          );

        default:
          return (
            <Column key={col.field} field={col.field} header={col.header} />
          );
      }
    });
    const footerModalAdicionar = (
      <div>
        <Button
          label="Cancelar"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            this.setState({ adicionarVisible: false });
          }}
          className="btn-coad-background-outline"
        />
        <Button
          label="Adicionar"
          style={{ marginRight: ".25em" }}
          // onClick={this.handleClickCadastratar.bind(this)}
        />
      </div>
    );
    const { obrigacoes } = this.state;
    const rowsPerPage = 5;
    const header = this.renderHeader();
    return (
      <div>
        <Row>
          <Col lg={6} xl={6}>
            <h6 style={{ fontWeight: "bold" }}>
              Obrigações Contratuais já adicionadas
            </h6>
          </Col>
          <Col lg={6} xl={6}>
            <span className="float-right">
              <Button
                icon="pi pi-file"
                label="Adicionar Obrigação"
                style={{ marginBottom: ".80em" }}
                onClick={() => {
                  this.setState({ adicionarVisible: true });
                }}
                className="btn-coad-background-outline"
              />
            </span>
          </Col>
        </Row>
        {obrigacoes.length > 0 ? (
          <DataTable
            value={obrigacoes}
            resizableColumns={true}
            columnResizeMode="fit"
            paginator={obrigacoes.length > rowsPerPage}
            rows={rowsPerPage}
            paginatorTemplate="PrevPageLink PageLinks NextPageLink"
            className="datatable-strapd-coad"
          >
            {dynamicColumns}
          </DataTable>
        ) : (
          <div>
            <DataTable
              footer={footerSemObrigacoes}
              className="datatable-footer-coad "
            >
              <Column header="Item" style={{ width: "10%" }} />
              <Column header="Obrigações" />
              <Column header="" style={{ width: "8em" }} />
            </DataTable>
          </div>
        )}

        <Dialog
          header="Adicionar Obrigações Contratuais"
          visible={this.state.adicionarVisible}
          style={{ width: "60vw" }}
          footer={footerModalAdicionar}
          onHide={() => {
            this.setState({ adicionarVisible: false });
          }}
        >
          <p>
            Adicione Item e obrigações em seus respectivos campos. Caso queira
            adicionar sub-item (Ex: 01.1), insira no campo “Obrigações
            Contratuais” do item principal.
            <br />
          </p>
          <Row>
            <Col lg={4} xl={4}>
              <label for="item">Item</label>
              <br />
              <InputText
                value={this.state.item}
                onChange={e =>
                  this.setState({
                    item: e.target.value
                  })
                }
                placeholder="Digitar item"
                className="w-100"
              />
            </Col>
            <Col lg={8} xl={8} className="p-fluid">
              <label for="obrigacao">Obrigações Contratuais</label>
              <br />
              <Editor
                headerTemplate={header}
                style={{ height: "120px" }}
                value={this.state.obrigacao}
                onTextChange={e => this.setState({ obrigacao: e.htmlValue })}
                className="editor-coad"
              />
            </Col>
          </Row>
        </Dialog>
      </div>
    );
  }
}
