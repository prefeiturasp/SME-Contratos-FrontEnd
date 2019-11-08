import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Row, Col } from "reactstrap";
import { InputText } from "primereact/inputtext";

export default class ListarTermoContrato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termos: [
        {
          data: "15/10/19 16:05",
          tc: "21/10",
          gestor: "João Ninguem",
          suplente: "Couve Flor"
        },
        {
          data: "14/10/19 12:05",
          tc: "10/10",
          gestor: "Dona Florinda",
          suplente: "João Ninguem"
        },
        {
          data: "14/10/19 12:05",
          tc: "10/10",
          gestor: "Dona Florinda",
          suplente: "João Ninguem"
        },
        {
          data: "13/10/19 16:35",
          tc: "19/10",
          gestor: "Couve Flor",
          suplente: "João Ninguem"
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <div style={{ paddingBottom: 10 }}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              <h2></h2>
              <h6 style={{ marginLeft: 15, fontWeight: "bold" }}>
                Últimos Cadastros
              </h6>
            </Col>
            <Col lg={6} xl={6}>
              <div className="p-inputgroup float-right">
                <InputText placeholder="Buscar Gestor/Suplente" />
                <Button icon="pi pi-search" className="p-button" />
              </div>
            </Col>
          </Row>
        </div>
        <DataTable value={this.state.termos} paginator={true}>
          <Column field="data" header="Data/Hora" />
          <Column field="tc" header="Nº T.C" />
          <Column field="gestor" header="Gestor" />
          <Column field="suplente" header="Suplente" />
        </DataTable>
      </div>
    );
  }
}
