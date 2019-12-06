import React, { useState, useEffect, Fragment, useCallback } from "react";
import { FormGroup, Input, Label, Card } from "reactstrap";
import { Button } from "primereact/button";
import Grupo from "./Grupo";
import { Button as AntButton } from "antd";
import {
  criaModeloAteste,
  excluiModeloAteste
} from "../../service/ModeloAteste.service";
import { getUrlParams } from "../../utils/params";
import { Dialog } from "primereact/dialog";
import { redirect } from "../../utils/redirect";

const Modelo = props => {
  const [modelo, setModelo] = useState({});
  const [modoVisualizacao, setModoVisualizacao] = useState(false);
  const [modalExcluir, setmodalExcluir] = useState(false);

  useEffect(() => {
    setModelo(props.modelo);
    const parametro = getUrlParams();
    if (!parametro.uuid) {
      setModoVisualizacao(false);
    }
  }, [props.modelo]);

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
    setModelo({ ...modelo });
  };

  const ativaModoEdicao = () => {
    setModoVisualizacao(false);
  };

  const exibeModalExcluir = () => {
    setmodalExcluir(true);
  };

  const ocultaModalExcluir = () => {
    setmodalExcluir(false);
  };

  const confirmaModelo = async () => {
    const resultado = criaModeloAteste(modelo);
  };

  const excluirModelo = () => {
    excluiModeloAteste(modelo.uuid)
      .then(redirect("#/listar-modelos-ateste/"))
      .catch(err =>
        alert(
          "Modelo de ateste não pode ser excluido! Este modelo está vinculado a um ou mais contratos."
        )
      );
  };

  const mostraAlertaContainer = useCallback(event => {
    props.mostraAlerta();
  }, []);

  const habilitaBotao =
    modoVisualizacao === false && modelo.titulo && modelo.grupos_de_verificacao
      ? false
      : true;

  const footerModalExcluir = (
    <div>
      <Button
        label="Excluir"
        style={{ marginRight: ".25em" }}
        onClick={excluirModelo}
        className="btn-coad-background-outline"
      />

      <Button
        label="cancelar"
        style={{ marginRight: ".25em" }}
        onClick={ocultaModalExcluir}
      />
    </div>
  );

  return (
    <Fragment>
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
          onClick={confirmaModelo}
        />
        <Button className="btn-coad-background-outline mx-2" label="Cancelar" />
        {modoVisualizacao === false ? (
          <Button
            disabled={modoVisualizacao}
            className="btn-coad-background-outline mx-2"
            label="Excluir Modelo"
            onClick={exibeModalExcluir}
          />
        ) : (
          ""
        )}
      </FormGroup>
      <Dialog
        header="Excluir"
        visible={modalExcluir}
        style={{ width: "60vw" }}
        footer={footerModalExcluir}
        onHide={ocultaModalExcluir}
      >
        <div>
          <p>Deseja excluir modelo de ateste? </p>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default Modelo;
