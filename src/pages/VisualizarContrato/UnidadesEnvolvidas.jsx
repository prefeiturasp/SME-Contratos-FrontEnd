import React from "react";
import { Row, Col } from "reactstrap";
import { DataTable, Column } from "primereact/datatable";

const UnidadeEnvolvidas = props => {
  const mock = [
    {
      eol: "",
      unidades: "",
      equipamento: "",
      dre: "",
      lote: ""
    }
  ];
  return (
    <Row>
      <Col>
        <DataTable value={mock}>
          <Column field="eol" header="Código EOL" />
          <Column field="unidade" header="Un. que Recebem Serviço" />
          <Column field="equipamento" header="Equip." />
          <Column field="dre" header="DRE Corresp." />
          <Column field="lote" header="Lote Corresp." />
        </DataTable>
      </Col>
    </Row>
  );
};

export default UnidadeEnvolvidas;
