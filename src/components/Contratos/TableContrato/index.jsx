import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from 'primereact/paginator';
import "./style.scss";
import { redirect } from "../../../utils/redirect";

export class TableContrato extends Component {
  constructor() {
    super();
    this.state = {
        expandedRows: null,
        page: 0,
        index: 0,
    };
    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
  }

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

  rowExpansionTemplate(data) {
    return  <div className="p-grid p-fluid">
                <h6>Objeto</h6>
                <p>{data.objeto}</p>
            </div>;
  }

  mudaPagina(event){
    this.setState({
      pagina: event.page,
      index: event.first
    })
    this.props.mudarPagina(event.page + 1)
  }

  render() {
    const { contratos, colunas, loading, totalContratos } = this.props;

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
        {contratos.length > 0 || loading ? (
          <>
            <DataTable
              onRowClick={e => this.redirecionaDetalhe(e.data)}
              value={contratos}
              className="mt-3 datatable-strapd-coad table-disable-auto-size"
              selectionMode="single"
              loading={loading}
              expandedRows={this.state.expandedRows}
              onRowToggle={(e) => this.setState({expandedRows:e.data})}
              rowExpansionTemplate={this.rowExpansionTemplate}
            >
              <Column expander={true} style={{width: '5%'}}/>
              {dynamicColumns}
              
            </DataTable>
            {contratos.length < totalContratos && 
              <Paginator
                rows={10}
                totalRecords={totalContratos}
                onPageChange={(e) => this.mudaPagina(e)}
                first={this.state.index}
              />
            }
          </>
        ) : (
          <DataTable
            value={this.props.contratos}
            footer={
              "Não existe informação para os critérios de busca utilizados"
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
      </div>
    );
  }
}

export default TableContrato;
