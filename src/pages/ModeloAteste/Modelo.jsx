import React, { useState, useEffect, Fragment, useCallback } from "react";
import {
  FormGroup,
  Input,
  Label,
  Card,
  Button as ButtonBootstrap
} from "reactstrap";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Grupo from "./Grupo";
import { Button as AntButton, Switch } from "antd";
import {
  criaModeloAteste,
  alteraModeloAteste,
  excluiModeloAteste
} from "../../service/ModeloAteste.service";
import { CREATED, OK, NO_CONTENT } from "http-status-codes";
import { redirect } from "../../utils/redirect";
import { setFlashMessage } from "../../utils/flashMessages";
import { getUrlParams } from "../../utils/params";
import { Row, Col } from "reactstrap";

const Modelo = props => {
  const [visivel, setVisivel] = useState(false);
  const [visivelCancelar, setVisivelCancelar] = useState(false);
  const [modelo, setModelo] = useState({});
  const [modoVisualizacao, setModoVisualizacao] = useState(true);
  const [incluir, setIncluir] = useState(true);
  const [modalExcluir, setmodalExcluir] = useState(false);
  const [modalDuplicar, setmodalDuplicar] = useState(false);

  useEffect(() => {
    setModelo(props.modelo);
    const parametro = getUrlParams();
    if (!parametro.uuid) {
      setIncluir(false);
      setModoVisualizacao(false);
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

  const excluirGrupo = index => {
    modelo.grupos_de_verificacao.splice(index, 1);
    setModelo({ ...modelo });
  };

  const confirmaModelo = async () => {
    const resultado = await criaModeloAteste(modelo);
    if (resultado.status === CREATED) {
      setFlashMessage("Modelo de ateste criado com sucesso", "sucesso");
      redirect("#/listar-modelos-ateste");
    }
  };

  const alteraModelo = async () => {
    const resultado = await alteraModeloAteste(modelo);
    if (resultado.status === OK) {
      setFlashMessage("Modelo de ateste alterado com sucesso", "sucesso");
      redirect("#/listar-modelos-ateste");
    }
  };

  const excluirModelo = async () => {
    const resultado = await excluiModeloAteste(modelo.uuid);
    if (resultado.status === NO_CONTENT) {
      setFlashMessage("Modelo de Ateste excluído com sucesso", "sucesso");
      redirect("#/listar-modelos-ateste/");
    } else {
      redirect("#/listar-modelos-ateste/");
      setFlashMessage(
        "Modelo de ateste não pode ser excluido! Este modelo está vinculado a um ou mais contratos.",
        "error"
      );
    }
  };

  const duplicaModelo = async () => {
    delete modelo.uuid;
    delete modelo.criado_em;
    delete modelo.alterado_em;
    modelo.titulo = modelo.titulo + " (Cópia)";
    setmodalDuplicar(false);
    const resultado = await criaModeloAteste(modelo);
    if (resultado.status === CREATED) {
      setFlashMessage("Modelo de ateste duplicado com sucesso", "sucesso");
      redirect(`#/modelo-ateste/?uuid=${resultado.data.uuid}`);
    }
  };

  const mostraAlertaContainer = useCallback(event => {
    props.mostraAlerta();
  }, []);

  const habilitaBotao =
    modoVisualizacao === false && modelo.titulo && modelo.grupos_de_verificacao
      ? false
      : true;
  const mensagemConfirmacao = !incluir
    ? "Deseja confirmar criação de novo modelo de ateste?"
    : "Deseja confirmar alteração deste modelo de ateste?";

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
        onClick={() => setmodalExcluir(false)}
      />
    </div>
  );

  const footerModaDuplicar = (
    <div>
      <Button
        label="Duplicar"
        style={{ marginRight: ".25em" }}
        onClick={duplicaModelo}
        className="btn-coad-background-outline"
      />

      <Button
        label="cancelar"
        style={{ marginRight: ".25em" }}
        onClick={() => setmodalDuplicar(false)}
      />
    </div>
  );

  return (
    <Fragment>
      <FormGroup className="d-flex flex-row-reverse mt-3">
        <Button
          disabled={habilitaBotao}
          className="btn-coad-primary"
          label="Salvar"
          onClick={exibeDialog}
        />
        {modoVisualizacao === false && incluir === true ? (
          <Button
            disabled={modoVisualizacao}
            className="btn-coad-background-outline mr-2"
            label="Excluir Modelo"
            onClick={() => setmodalExcluir(true)}
          />
        ) : (
          ""
        )}
        {modoVisualizacao === true && incluir === true ? (
          <Button
          className="btn-coad-background-outline mr-2"
          label="Duplicar"
          onClick={() => setmodalDuplicar(true)}
        />
        ) : ("")}
        <Button
          disabled={habilitaBotao}
          className="btn-coad-background-outline mr-2"
          label="Cancelar"
          onClick={() => setVisivelCancelar(true)}
        />
        <ButtonBootstrap
          onClick={() => redirect("#/listar-modelos-ateste")}
          className="btn-coad-blue mx-2"
        >
          <i className="fas fa-arrow-left" /> Voltar
        </ButtonBootstrap>
      </FormGroup>
      <Dialog
        header={"Cancelar "}
        visible={visivelCancelar}
        style={{ width: "60vw" }}
        modal={true}
        onHide={() => setVisivelCancelar(false)}
        footer={
          <FormGroup className="pt-4 d-flex justify-content-end">
            <Button
              disabled={habilitaBotao}
              className="btn-coad-background-outline"
              label="Cancelar"
              onClick={() => {
                setFlashMessage(
                  "Alterações em modelo de ateste canceladas",
                  "warning"
                );
                redirect("/#/listar-modelos-ateste");
              }}
            />
            <Button
              className="btn-coad-primary mx-2"
              onClick={() => setVisivelCancelar(false)}
              label="Continuar"
            />
          </FormGroup>
        }
      >
        <span>Deseja cancelar alterações em modelo de ateste?</span>
      </Dialog>
      <Dialog
        header={"Confirmar"}
        visible={visivel}
        style={{ width: "60vw" }}
        modal={true}
        onHide={fechaDialog}
      >
        <span>{mensagemConfirmacao}</span>
        <FormGroup className="pt-4 d-flex justify-content-end">
          <Button
            className="btn-coad-background-outline mx-2"
            onClick={fechaDialog}
            label="Cancelar"
          />
          {!incluir ? (
            <Button
              disabled={habilitaBotao}
              className="btn-coad-primary"
              label="Confirmar"
              onClick={confirmaModelo}
            />
          ) : (
            <Button
              disabled={habilitaBotao}
              className="btn-coad-primary"
              label="Alterar"
              onClick={alteraModelo}
            />
          )}
        </FormGroup>
      </Dialog>
      <Row>
        <Col lg={6} xl={6}>
          <h6>
            <i className="fas fa-sm fa-file-signature" /> Modelo de Ateste
          </h6>
        </Col>
        {incluir ? (
          <Col className="d-flex justify-content-end">
            <Label className="px-3">Modo de edição</Label>
            <Switch
              defaultChecked={!modoVisualizacao}
              onChange={() => setModoVisualizacao(!modoVisualizacao)}
            />
          </Col>
        ) : (
          ""
        )}
      </Row>
      <br />
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
        <Label className="font-weight-bold">Grupo(s) de verificação</Label>
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
              <Row>
                <Col className="d-flex justify-content-end">
                  <Button
                    disabled={modoVisualizacao}
                    className="btn-coad-background-outline"
                    label="Excluir grupo"
                    onClick={() => excluirGrupo(i)}
                  />
                </Col>
              </Row>
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
          className="btn-coad-primary mr-1"
          label="Salvar"
          onClick={exibeDialog}
        />
        {modoVisualizacao === false && incluir === true ? (
          <Button
            disabled={modoVisualizacao}
            className="btn-coad-background-outline mr-2"
            label="Excluir Modelo"
            onClick={() => setmodalExcluir(true)}
          />
        ) : (
          ""
        )}
        {modoVisualizacao === true && incluir === true ? (
          <Button
          className="btn-coad-background-outline mr-2"
          label="Duplicar"
          onClick={() => setmodalDuplicar(true)}
        />
        ) : ("")}

        <Button
          disabled={habilitaBotao}
          className="btn-coad-background-outline mr-2"
          label="Cancelar"
          onClick={() => setVisivelCancelar(true)}
        />

        <ButtonBootstrap
          onClick={() => redirect("#/listar-modelos-ateste")}
          className="btn-coad-blue mx-2"
        >
          <i className="fas fa-arrow-left" /> Voltar
        </ButtonBootstrap>
      </FormGroup>
      <Dialog
        header="Excluir"
        visible={modalExcluir}
        style={{ width: "60vw" }}
        footer={footerModalExcluir}
        onHide={() => setmodalExcluir(false)}
      >
        <div>
          <p>Deseja excluir modelo de ateste? </p>
        </div>
      </Dialog>
      <Dialog
        header="Duplicar"
        visible={modalDuplicar}
        style={{ width: "60vw" }}
        footer={footerModaDuplicar}
        onHide={() => setmodalDuplicar(false)}
      >
        <div>
          <p>Deseja duplicar modelo de ateste?</p>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default Modelo;
