import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import "./style.scss";
import { redirect } from "../../../utils/redirect";

function TableContrato({
  contratos,
  colunas,
  loading,
  totalContratos,
  rowIndex,
  mudarPagina,
}) {
  const [index, setIndex] = useState(0);
  const [expandedRows, setExpandedRows] = useState(null);

  const redirecionaDetalhe = value => {
    const url = "/#/visualizar-contrato?uuid=" + value.uuid;
    redirect(url);
  };

  const onIndexTemplate = () => {
    return rowIndex + 1;
  };

  const rowExpansionTemplate = data => {
    return (
      <div className="p-grid p-fluid expand-contrato">
        <div>
          <h6>Objeto</h6>
          <p>{data.objeto}</p>
        </div>
      </div>
    );
  };

  const mudaPagina = event => {
    setIndex(event.first);
    mudarPagina(event.page + 1);
  };

  const dynamicColumns = colunas.map(col => {
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
          body={onIndexTemplate.bind(this)}
          style={{ width: "50px" }}
        />
      );
    }
  });

  return (
    <div className="h-auto w-100 tabela-contratos">
      {contratos.length > 0 || loading ? (
        <>
          <DataTable
            onRowClick={e => redirecionaDetalhe(e.data)}
            value={contratos}
            className="mt-3 datatable-strapd-coad table-disable-auto-size"
            selectionMode="single"
            loading={loading}
            expandedRows={expandedRows}
            onRowToggle={e => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
          >
            <Column expander={true} style={{ width: "5%" }} />
            {dynamicColumns}
          </DataTable>
          {contratos.length < totalContratos && (
            <Paginator
              rows={10}
              totalRecords={totalContratos}
              onPageChange={e => mudaPagina(e)}
              first={index}
            />
          )}
        </>
      ) : (
        <DataTable
          value={contratos}
          footer={"Não existe informação para os critérios de busca utilizados"}
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

export default TableContrato;
