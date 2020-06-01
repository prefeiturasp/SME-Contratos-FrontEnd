import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "reactstrap";

const obrigacaoTemplate = (rowData) => {
  return <div dangerouslySetInnerHTML={{ __html: rowData.obrigacao }} />;
};

const Grupo = ({ nome, obrigacoes: itens = [] }) => (
  <div className="mb-3">
    <Row className="mb-1"><h6>{nome}</h6></Row>
    <Row>
      {itens.length > 0 && (
        <DataTable
          value={itens}
          paginator={itens.length > 5}
          rows={5}
          paginatorTemplate="PrevPageLink PageLinks NextPageLink"
          className="datatable-strapd-coad"
        >
          <Column field="item" header="Item" width={"20%"} />
          <Column
            field="obrigacao"
            header="Obrigações"
            body={obrigacaoTemplate}
          />
        </DataTable>
      )}
      {!itens.length && (
        <DataTable
          footer={"Esse grupo não contém itens de obrigação."}
          className="datatable-footer-coad "
        >
          <Column header="Item" style={{ width: "10%" }} />
          <Column header="Obrigações" />
          <Column header="" style={{ width: "8em" }} />
        </DataTable>
      )}
    </Row>
  </div>
);

const ListarObrigacoesContratuais = ({ grupos = [] }) => {
  if (!grupos.length)
    return (
      <Row>Não existem obrigações contratuais adicionadas no contrato.</Row>
    );
  return grupos.map((grupo) => {
    return <Grupo nome={grupo.nome} obrigacoes={grupo.itens_de_obrigacao} />;
  });
};

export default ListarObrigacoesContratuais;
