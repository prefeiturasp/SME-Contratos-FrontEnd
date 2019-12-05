import React, { useState, useEffect, Fragment, useCallback } from "react";
import { FormGroup, Input, Label, Card } from "reactstrap";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Grupo from "./Grupo";
import { Button as AntButton } from "antd";
import { criaModeloAteste } from "../../service/ModeloAteste.service";
import { CREATED } from "http-status-codes";
import { redirect } from "../../utils/redirect";
import { setFlashMessage } from "../../utils/flashMessages";
import { getUrlParams } from "../../utils/params";

const Modelo = props => {
  const [modelo, setModelo] = useState({});
  const [modoVisualizacao, setModoVisualizacao] = useState(true);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    setModelo(props.modelo); 
    const parametro = getUrlParams();
    if(!parametro.uuid){
      setModoVisualizacao(false)
    }
  }, [props.modelo]);

  const alteraTitulo = value => {
    modelo.titulo = value;
    setModelo({ ...modelo });
  };

  const fechaDialog = () => {
    setVisivel(false);
  };

  const exibeDialog = () => {
    setVisivel(true);
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
    setModelo({ ...modelo });
  };

  const ativaModoEdicao = () => {
    setModoVisualizacao(false);
  };

  const confirmaModelo = async () => {
    const resultado = await criaModeloAteste(modelo);
    if (resultado.status === CREATED) {
      setFlashMessage("Modelo de ateste criado com sucesso","sucesso")
      redirect("#/listar-modelos-ateste")
    }
  };

  const mostraAlertaContainer = useCallback(event => {
    props.mostraAlerta();
  }, []);

  const habilitaBotao =
    modoVisualizacao === false && modelo.titulo && modelo.grupos_de_verificacao
      ? false
      : true;

  return (
    <Fragment>
      <Dialog
        header={"Confirmar"}
        visible={visivel}
        style={{ width: "60vw" }}
        modal={true}
        onHide={fechaDialog}
      >
        <span>Deseja confirmar criação de novo modelo de ateste?</span>
        <FormGroup className="pt-4 d-flex justify-content-end">
          <Button
            className="btn-coad-background-outline mx-2"
            onClick={fechaDialog}
            label="Cancelar"
          />

          <Button
            disabled={habilitaBotao}
            className="btn-coad-primary"
            label="Confirmar"
            onClick={confirmaModelo}
          />
        </FormGroup>
      </Dialog>
      <FormGroup>
        <Label className="font-weight-bold">Título do modelo de ateste</Label>
        <Input
          value={modelo ? modelo.titulo : ""}
          onChange={e => alteraTitulo(e.target.value)}
          autoComplete={false}
          disabled={modoVisualizacao}
        />
      </FormGroup>
      <FormGroup>
        <Label>Grupo(s) de verificação</Label>
        {modelo.grupos_de_verificacao ? (
          modelo.grupos_de_verificacao.map((grupo, i) => (
            <Card>
              <Grupo
                key={i}
                grupo={grupo}
                editar={editaGrupo}
                index={i}
                mostraAlerta={mostraAlertaContainer}
                modoVisualizacao={modoVisualizacao}
              />
            </Card>
          ))
        ) : (
          <Card>
            <Grupo
              grupo={{}}
              editar={editaGrupo}
              index={0}
              mostraAlerta={mostraAlertaContainer}
              modoVisualizacao={modoVisualizacao}
            />
          </Card>
        )}
        <div>
          <AntButton
            disabled={habilitaBotao}
            type="link"
            size="small"
            onClick={addGrupo}
          >
            Adicionar novo grupo
          </AntButton>
        </div>
      </FormGroup>
      <FormGroup className="d-flex flex-row-reverse mt-3">
        <Button
          disabled={habilitaBotao}
          className="btn-coad-primary"
          label="Confirmar"
          onClick={exibeDialog}
        />
        <Button className="btn-coad-background-outline mx-2" label="Cancelar" />
      </FormGroup>
    </Fragment>
  );
};

export default Modelo;
