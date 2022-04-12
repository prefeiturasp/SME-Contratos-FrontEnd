import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import "./style.scss";
import { redirect } from "../../../utils/redirect";
import moment from "moment";

const ListaAtas = ({ atas, totalEditais, mudarPagina, loading }) => {
  const [index, setIndex] = useState(0);
  const [expandedRows, setExpandedRows] = useState(null);

  const redirecionaAta = value => {
    const url = "#/atas/?uuid=" + value.uuid;
    redirect(url);
  };

  const rowExpansionTemplate = data => {
    return (
      <div className="p-grid p-fluid expand-ata">
        <div>
          <h6>Objeto</h6>
          <p>{data.objeto}</p>
        </div>
      </div>
    );
  };

  const textoDataEncerramento = rowData => {
    let classe =
      moment(rowData.data_encerramento, "DD/MM/YYYY") < moment()
        ? "texto-vermelho"
        : "";
    return <span className={classe}>{rowData.data_encerramento}</span>;
  };

  const mudaPagina = event => {
    setIndex(event.first);
    mudarPagina(event.page + 1);
  };

  return (
    <div>
      <DataTable
        value={atas}
        className="datatable-strapd-coad tabela-atas"
        paginatorTemplate="PrevPageLink PageLinks NextPageLink"
        emptyMessage="Não existe informação para os critérios de busca utilizados"
        expandedRows={expandedRows}
        loading={loading}
        onRowToggle={e => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        onRowClick={e => redirecionaAta(e.data)}
        selectionMode="single"
      >
        <Column expander={true} style={{ width: "5%" }} />
        <Column field="numero" header="Nº da Ata" />
        <Column field="nome_empresa" header="Nome da Empresa" />
        <Column field="status" header="Status" />
        <Column
          field="data_encerramento"
          header="Data de Encerramento"
          body={textoDataEncerramento}
        />
      </DataTable>
      {atas.length < totalEditais && (
        <Paginator
          rows={10}
          totalRecords={totalEditais}
          onPageChange={e => mudaPagina(e)}
          first={index}
        />
      )}
    </div>
  );
};

export default ListaAtas;
