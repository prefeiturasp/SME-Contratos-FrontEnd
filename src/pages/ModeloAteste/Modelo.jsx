import React, { useState, useEffect, Fragment } from "react";
import { FormGroup, Input, Label, Card } from "reactstrap";
import Grupo from "./Grupo";

const Modelo = props => {
  const [modelo, setModelo] = useState([]);
  useEffect(() => {
    setModelo(props.modelo);
  });

  const alteraTitulo = value => {
    modelo.titulo = value;
    setModelo({ ...modelo });
  };

  return (
    <Fragment>
      <FormGroup>
        <Label className="font-weight-bold">Título do modelo de ateste</Label>
        <Input
          value={modelo.titulo}
          onChange={e => alteraTitulo(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Grupo(s) de verificação</Label>
        {modelo.grupos_de_verificacao
          ? modelo.grupos_de_verificacao.map((grupo, i) => (
              <Card>
                <Grupo key={i} grupo={grupo} />
              </Card>
            ))
          : ""}
      </FormGroup>
    </Fragment>
  );
};

export default Modelo;
