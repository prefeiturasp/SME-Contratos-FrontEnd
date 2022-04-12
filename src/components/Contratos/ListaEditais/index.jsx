import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import "./style.scss";
import { redirect } from "../../../utils/redirect";

const ListarEditais = ({ editais, totalEditais, mudarPagina, loading }) => {
  const [index, setIndex] = useState(0);
  const [expandedRows, setExpandedRows] = useState(null);

  const redirecionaEdital = value => {
    const url = "#/edital/?uuid=" + value.uuid;
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

  return (
    <div>
      <DataTable
        value={editais}
        className="datatable-strapd-coad tabela-editais"
        paginatorTemplate="PrevPageLink PageLinks NextPageLink"
        emptyMessage="Não existe informação para os critérios de busca utilizados"
        expandedRows={expandedRows}
        loading={loading}
        onRowToggle={e => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        onRowClick={e => redirecionaEdital(e.data)}
        selectionMode="single"
      >
        <Column expander={true} style={{ width: "5%" }} />
        <Column field="numero" header="Nº do Edital" />
        <Column field="status" header="Status" />
        <Column field="tipo_contratacao" header="Tipo de contratação" />
        <Column field="data_homologacao" header="Data de Homologação" />
      </DataTable>
      {editais.length < totalEditais && (
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

export default ListarEditais;
