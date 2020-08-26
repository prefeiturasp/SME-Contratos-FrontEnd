import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Row, Col } from "reactstrap";
import { getListaDeEditais } from "../../service/Editais.service";
import { redirect } from "../../utils/redirect";

export default class ListarEditais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      editais: []
    };
  }

  actionTemplate(rowData, column) {
    return (
      <div>
        <Button
          label="Visualizar"
          className="btn-coad-background-outline"
          onClick={event => {
            redirect(`#/edital/?uuid=${column.uuid}`);
          }}
        />
      </div>
    );
  }

  buscaEditais = async () => {
    const editais = await getListaDeEditais();
    editais.reverse();
    this.setState({ editais });
  };

  componentDidMount() {
    this.buscaEditais();
  }

  render() {
    const { editais } = this.state;
    const rowsPerPage = 5;
    return (
      <div>
        <Row>
          <Col lg={8} xl={8}>
            <i
              className="float-left fas fa-file-signature"
              style={{ marginRight: "5px", color: "#42474A" }}
            ></i>
            <h6 style={{ fontWeight: "bold" }}>
            Editais e Obrigações cadastrados
            </h6>
          </Col>
          <Col lg={4} xl={4}>
            <span className="float-right">
              <Button
                icon="pi pi-file"
                label="Criar Edital"
                style={{ marginBottom: ".80em" }}
                className="btn-coad-background-outline"
                onClick={event => {
                  redirect(`#/edital/`);
                }}
              />
            </span>
          </Col>
        </Row>
        <DataTable
          value={editais}
          className="datatable-strapd-coad"
          paginator={editais.length > rowsPerPage}
          rows={rowsPerPage}
          paginatorTemplate="PrevPageLink PageLinks NextPageLink"
        >
          <Column field="numero" header="Edital" />
          <Column
            field="criado_em"
            header="Data criação"
            style={{ width: "10em" }}
          />
          <Column
            body={this.actionTemplate.bind(this, editais)}
            style={{ textAlign: "center", width: "10em" }}
          />
        </DataTable>
      </div>
    );
  }
}
