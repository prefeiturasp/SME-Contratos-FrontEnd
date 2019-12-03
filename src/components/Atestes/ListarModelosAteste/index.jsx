import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Row, Col } from "reactstrap";
import { getModeloAtesteLookup } from "../../../service/ModeloAteste.service";

export default class ListarObrigacoesContratuais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      modelos: []
    };
  }

  actionTemplate(rowData, column) {
    return (
      <div>
        <Button
          label="Visualizar"
          className="btn-coad-background-outline"
          //   onClick={event => {
          //     this.onClickVisualizar(column.uuid);
          //   }}
        />
      </div>
    );
  }

  buscaModelos = async () => {
    const modelos = await getModeloAtesteLookup();
    this.setState({ modelos });
  };

  componentDidMount() {
    this.buscaModelos();
  }

  render() {
    const { modelos } = this.state;
    return (
      <div>
        <Row>
          <Col lg={8} xl={8}>
            <i
              className="float-left fas fa-file-signature"
              style={{ marginRight: "5px", color: "#42474A" }}
            ></i>
            <h6 style={{ fontWeight: "bold" }}>
              Modelos de Ateste já cadastrados
            </h6>
          </Col>
          <Col lg={4} xl={4}>
            <span className="float-right">
              <Button
                icon="pi pi-file"
                label="Criar Modelo de Ateste"
                style={{ marginBottom: ".80em" }}
                className="btn-coad-background-outline"
              />
            </span>
          </Col>
        </Row>
        <DataTable value={modelos} className="datatable-strapd-coad">
          <Column field="titulo" header="Modelos de ateste" />
          <Column
            field="criado_em"
            header="Data criação"
            style={{ textAlign: "center", width: "10em" }}
          />
          <Column
            body={this.actionTemplate.bind(this)}
            style={{ textAlign: "center", width: "10em" }}
          />
        </DataTable>
      </div>
    );
  }
}
