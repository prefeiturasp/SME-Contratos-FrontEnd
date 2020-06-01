import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "reactstrap";

const obrigacaoTemplate = (rowData) => {
  return <div dangerouslySetInnerHTML={{ __html: rowData.obrigacao }} />;
};

const ListarObrigacoesContratuais = ({ obrigacoes = [] }) => {
  return (
    <Row>
      {obrigacoes.length > 0 && (
        <DataTable
          value={obrigacoes}
          paginator={obrigacoes.length > 5}
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
      {!obrigacoes.length && (
        <DataTable
          footer={"Não existem obrigações contratuais adicionadas no contrato"}
          className="datatable-footer-coad "
        >
          <Column header="Item" style={{ width: "10%" }} />
          <Column header="Obrigações" />
          <Column header="" style={{ width: "8em" }} />
        </DataTable>
      )}
    </Row>
  );
};

export default ListarObrigacoesContratuais;
