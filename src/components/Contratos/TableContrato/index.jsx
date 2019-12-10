import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatadoMonetario } from "../../../utils/formatador";
import "./style.scss";
import { redirect } from "../../../utils/redirect";

const styled = {
  cursor: "pointer"
};


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

  render() {
    const { contratos, colunas } = this.props;

    const total = contratos.reduce(
      (prevVal, value) => prevVal + value.total_mensal,
      0
    );

    let dynamicColumns = colunas.map((col, i) => {
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
            key={col.field}
            field={col.field}
            header={col.header}
            style={{ width: "50px" }}
          />
        );
      }
    });

    return (
      <div className="h-auto w-100">
        <DataTable
          onRowClick={e => this.redirecionaDetalhe(e.data)}
          value={this.props.contratos}
          scrollable={true}
          scrollHeight="300px"
          resizableColumns={true}
          columnResizeMode="expand"
          className="mt-3"
          style={styled}
        >
          {dynamicColumns}
        </DataTable>

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
