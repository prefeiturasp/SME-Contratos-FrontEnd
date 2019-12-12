import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatadoMonetario } from "../../../utils/formatador";
import "./style.scss";
import { redirect } from "../../../utils/redirect";

export class TableContrato extends Component {
  formataTotalMensal(rowData, column) {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
    return formatter.format(rowData.total_mensal);
  }

  redirecionaDetalhe = value => {
    const url = "/#/visualizar-contrato?uuid=" + value.uuid;
    redirect(url);
  };

  onIndexTemplate(data, props) {
    return props.rowIndex + 1;
  }

  render() {
    const { contratos, colunas } = this.props;
    const total = contratos.reduce(
      (prevVal, value) => prevVal + value.total_mensal,
      0
    );

    let novaColuna = [{ field: "row_index", header: "" }, ...colunas];

    let dynamicColumns = novaColuna.map((col, i) => {
      if (col.field !== "row_index") {
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={col.body}
            style={{ width: "200px" }}
          />
        );
      } else {
        return (
          <Column
            field="Index"
            header=""
            body={this.onIndexTemplate.bind(this)}
            style={{ width: "50px" }}
          />
        );
      }
    });

    return (
      <div className="h-auto w-100">
        {this.props.contratos.length > 0 ? (
          <DataTable
            onRowClick={e => this.redirecionaDetalhe(e.data)}
            value={this.props.contratos}
            scrollable={true}
            scrollHeight="300px"
            resizableColumns={true}
            columnResizeMode="expand"
            className="mt-3 datatable-strapd-coad"
            selectionMode="single"
          >
            {dynamicColumns}
          </DataTable>
        ) : (
          <DataTable
            value={this.props.contratos}
            footer={
              "Não existem contratos atribuidos ao seu usuário até o momento."
            }
            columnResizeMode="expand"
            className="mt-3 datatable-footer-coad"
          >
            <Column header="TC" />
            <Column header="Sit. Contrato" />
            <Column header="Empresa" />
            <Column header="Vigência" />
            <Column header="Data" />
          </DataTable>
        )}

        <table className="table">
          <tbody>
            <tr>
              <td>Total</td>
              <td className="float-right">{formatadoMonetario(total)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableContrato;
