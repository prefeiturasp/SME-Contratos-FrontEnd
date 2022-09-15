import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./style.scss";
import { redirect } from "../../../utils/redirect";
import Pagination from "../../Shared/pagination";

const ListaProdutos = ({ produtos, totalProdutos, mudarPagina, loading }) => {
  const [index, setIndex] = useState(0);

  const redirecionaProduto = value => {
    const url = "#/produtos/?uuid=" + value.uuid;
    redirect(url);
  };

  const mudaPagina = event => {
    setIndex(event.first);
    mudarPagina(event.page + 1);
  };

  const textoSeCategoriaOutros = (rowData, column) => {
    let textoAlterado =
      rowData.categoria === "Outro(s)" ? "-" : rowData[column.field];
    return <span>{textoAlterado}</span>;
  };

  const textoNegritoOutros = (rowData, column) => {
    let classe = rowData.categoria === "Outro(s)" ? "font-weight-bold" : "";
    return <span className={classe}>{rowData[column.field]}</span>;
  };

  return (
    <div>
      <DataTable
        value={produtos}
        className="datatable-strapd-coad tabela-produtos"
        paginatorTemplate="PrevPageLink PageLinks NextPageLink"
        emptyMessage="Não existe informação para os critérios de busca utilizados"
        loading={loading}
        onRowClick={e => redirecionaProduto(e.data)}
        selectionMode="single"
      >
        <Column field="nome" header="Nome do Produto" />
        <Column
          field="categoria"
          header="Categoria"
          body={textoNegritoOutros}
        />
        <Column
          field="tipo_programa"
          header="Programa"
          body={textoSeCategoriaOutros}
        />
        <Column
          field="grupo_alimentar"
          header="Grupo Alimentar"
          body={textoSeCategoriaOutros}
        />
      </DataTable>
      {produtos.length < totalProdutos && (
        <Pagination
          rows={10}
          totalRecords={totalProdutos}
          onPageChange={e => mudaPagina(e)}
          first={index}
        />
      )}
    </div>
  );
};

export default ListaProdutos;
