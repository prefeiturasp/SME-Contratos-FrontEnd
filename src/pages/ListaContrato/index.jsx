import React from "react";
import Page from "../../components/Page";
import TableContrato from "../../components/TableContrato";
import dadosContrato from "./dadosContrato.json";
import "./style.scss";

const nomeColunas = {
  termoContrato: "Termo de Contrato",
  sitContrato: "Sit. Contrato",
  empresa: "Empresa",
  vigencia: "Vigência",
  data: "Data"
};

export default () => (
  <Page titulo="Lista de Contratos">
    <div className="bg-table">
      <div className="table">
        <TableContrato
          dadosContrato={dadosContrato}
          nomeColunas={nomeColunas}
        />
      </div>
    </div>
  </Page>
);
