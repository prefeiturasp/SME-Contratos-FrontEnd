import React, { useState, useEffect, Fragment } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataScroller } from "primereact/datascroller";

const Grupo = props => {
  const [grupo, setGrupo] = useState({});

  useEffect(() => {
    setGrupo(props.grupo);
  });

  const actionTemplate = (rowData, column) => {
    return <Button className="btn-coad-background-outline" label="Editar" />;
  };

  const iconTemplate = (rowData, column) => {
    return <i className="fas fa-lg fa-arrows-alt-v"></i>
  };

  return (
    <Fragment>
      <FormGroup>
        <Label>Nome de grupo</Label>
        <Input value={grupo.nome} />
      </FormGroup>
      <FormGroup>
        <Label>Lista de itens de verificação </Label>
          <DataTable value={grupo.itens_de_verificacao} reorderableColumns={true}>
            {/* <Column style={{ width: "5em" }} field="item" header=" " /> */}
            <Column body={iconTemplate} style={{ width: "5em", align: "center" }} />
            <Column field="descricao" header="Itens de verificação" />
            <Column body={actionTemplate} style={{ width: "7em" }} />
          </DataTable>
      </FormGroup>
    </Fragment>
  );
};

export default Grupo;
