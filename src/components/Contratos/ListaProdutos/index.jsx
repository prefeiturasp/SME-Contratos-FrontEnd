import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import "./style.scss";
import { redirect } from "../../../utils/redirect";

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

  const textoOriginal = (column, rowData) => {
    switch (column) {
      case "durabilidade":
        return rowData.durabilidade;
      case "grupo_alimentar":
        return rowData.grupo_alimentar;
      default:
        return null;
    }
  };
  const textoSeCategoriaOutros = (rowData, column) => {
    let textoAlterado =
      rowData.categoria === "Outro(s)"
        ? "-"
        : textoOriginal(column.field, rowData);
    return <span>{textoAlterado}</span>;
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
        <Column field="categoria" header="Categoria" />
        <Column
          field="durabilidade"
          header="Durabilidade"
          body={textoSeCategoriaOutros}
        />
        <Column
          field="grupo_alimentar"
          header="Grupo Alimentar"
          body={textoSeCategoriaOutros}
        />
        <Column field="armazenabilidade" header="Armazenabilidade" />
      </DataTable>
      {produtos.length < totalProdutos && (
        <Paginator
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
