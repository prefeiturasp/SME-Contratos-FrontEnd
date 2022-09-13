import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./style.scss";
import { redirect } from "../../../utils/redirect";
import moment from "moment";
import Pagination from "../../Shared/pagination";

function TableContrato({
  contratos,
  colunas,
  loading,
  totalContratos,
  mudarPagina,
}) {
  const [index, setIndex] = useState(0);
  const [expandedRows, setExpandedRows] = useState(null);

  const redirecionaDetalhe = value => {
    const url = "/#/visualizar-contrato?uuid=" + value.uuid;
    redirect(url);
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

  const textoDataEncerramento = rowData => {
    let classe =
      moment(rowData.data_encerramento, "DD/MM/YYYY") < moment()
        ? "texto-vermelho"
        : "";
    return <span className={classe}>{rowData.data_encerramento}</span>;
  };

  const dynamicColumns = colunas.map(col => {
    if (col.field !== "data_encerramento") {
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
          body={textoDataEncerramento}
          style={{ width: "200px" }}
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
            <Pagination
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
          emptyMessage={
            "Não existe informação para os critérios de busca utilizados"
          }
          columnResizeMode="expand"
          className="mt-3 datatable-footer-coad"
        >
          <Column expander={true} style={{ width: "5%" }} />
          <Column header="Nome da empresa" />
          <Column header="Nº do Termo de Contrato" />
          <Column header="Status" />
          <Column header="Data Encerramento" />
        </DataTable>
      )}
    </div>
  );
}

export default TableContrato;
