import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { redirect } from "../../utils/redirect";

export default class ListarEditais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
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

  render() {
    const { editais } = this.props;
    const rowsPerPage = 5;
    return (
      <div>
        <DataTable
          value={editais}
          className="datatable-strapd-coad"
          paginator={editais.length > rowsPerPage}
          rows={rowsPerPage}
          paginatorTemplate="PrevPageLink PageLinks NextPageLink"
          emptyMessage="Não existe informação para os critérios de busca utilizados"
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
