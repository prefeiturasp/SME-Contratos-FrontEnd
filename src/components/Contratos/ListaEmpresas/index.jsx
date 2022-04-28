import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import "./style.scss";
import { redirect } from "../../../utils/redirect";

const ListaEmpresas = ({ empresas, totalEmpresas, mudarPagina, loading }) => {
  const [index, setIndex] = useState(0);

  const redirecionaEmpresa = value => {
    const url = "#/empresas/?uuid=" + value.uuid;
    redirect(url);
  };

  const mudaPagina = event => {
    setIndex(event.first);
    mudarPagina(event.page + 1);
  };

  return (
    <div>
      <DataTable
        value={empresas}
        className="datatable-strapd-coad tabela-empresas"
        paginatorTemplate="PrevPageLink PageLinks NextPageLink"
        emptyMessage="Não existe informação para os critérios de busca utilizados"
        loading={loading}
        onRowClick={e => redirecionaEmpresa(e.data)}
        selectionMode="single"
      >
        <Column field="nome" header="Nome da Empresa" />
        <Column field="cnpj" header="CNPJ" />
        <Column field="tipo_servico" header="Tipo de Serviço" />
        <Column field="situacao" header="Situação" />
      </DataTable>
      {empresas.length < totalEmpresas && (
        <Paginator
          rows={10}
          totalRecords={totalEmpresas}
          onPageChange={e => mudaPagina(e)}
          first={index}
        />
      )}
    </div>
  );
};

export default ListaEmpresas;
