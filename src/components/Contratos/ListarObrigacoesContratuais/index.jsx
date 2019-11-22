import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {
  getObrigacaoContratualByContrato,
} from "../../../service/ObrigacoesContratuais.service";

export default class ListarObrigacoesContratuais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obrigacoes: [],
      uuid: null,
      contrato: null,
      item: "",
      obrigacao: ""
    };
  }
  setaContrato() {
    this.setState({ contrato: this.props.contrato });
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
    const { obrigacoes } = this.state;
    const rowsPerPage = 5;
    return (
      <div>
        <h6 style={{ fontWeight: "bold" }}>
          Obrigações Contratuais já adicionadas
        </h6>
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
      </div>
    );
  }
}
