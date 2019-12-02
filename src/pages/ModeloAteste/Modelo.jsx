import React, { useState, useEffect, Fragment } from "react";
import { FormGroup, Input, Label, Card } from "reactstrap";
import { Button } from "primereact/button";
import Grupo from "./Grupo";

const Modelo = props => {
  const [modelo, setModelo] = useState({});

  useEffect(() => {
    setModelo(props.modelo);
  },[props.modelo]);

  const alteraTitulo = value => {
    modelo.titulo = value;
    setModelo({ ...modelo });
  };

  const editaGrupo = (index, grupo) => {
    if (modelo.grupos_de_verificacao) {
      modelo.grupos_de_verificacao[index] = grupo;
    } else {
      modelo.grupos_de_verificacao = [];
      modelo.grupos_de_verificacao[index] = grupo;
    }
    setModelo({ ...modelo });
  };

  const addGrupo = () => {
    modelo.grupos_de_verificacao.push({ nome: "" });
    setModelo({...modelo})
  };

  const confirmaModelo = () => {
    console.log(modelo)
  }

  const habilitaBotao =
    modelo.titulo && modelo.grupos_de_verificacao ? false : true;

  return (
    <Fragment>
      <FormGroup>
        <Label className="font-weight-bold">Título do modelo de ateste</Label>
        <Input
          value={modelo ? modelo.titulo : ""}
          onChange={e => alteraTitulo(e.target.value)}
          autoComplete={false}
        />
      </FormGroup>
      <FormGroup>
        <Label>Grupo(s) de verificação</Label>
        {modelo.grupos_de_verificacao ? (
          modelo.grupos_de_verificacao.map((grupo, i) => (
            <Card>
              <Grupo key={i} grupo={grupo} editar={editaGrupo} index={i} />
            </Card>
          ))
        ) : (
          <Card>
            <Grupo grupo={{}} editar={editaGrupo} index={0} />
          </Card>
        )}
        <div>
          <button
            onClick={addGrupo}
            disabled={habilitaBotao}
            className="btn btn-link font-weight-bold"
          >
            Adicionar novo grupo
          </button>
        </div>
      </FormGroup>
      <FormGroup className="d-flex flex-row-reverse mt-3">
        <Button
          disabled={habilitaBotao}
          className="btn-coad-primary p-2"
          label="Confirmar"
          onClick={confirmaModelo}
        />
        <Button
          className="btn-coad-background-outline p-2 mx-2"
          label="Cancelar"
        />
      </FormGroup>
    </Fragment>
  );
};

export default Modelo;
