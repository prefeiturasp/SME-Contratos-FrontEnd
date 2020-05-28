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
  criaEdital,
  alteraEdital,
  excluiEdital
} from "../../service/Editais.service";
import { CREATED, OK, NO_CONTENT } from "http-status-codes";
import { redirect } from "../../utils/redirect";
import { setFlashMessage } from "../../utils/flashMessages";
import { getUrlParams } from "../../utils/params";
import { Row, Col } from "reactstrap";
import * as R from "ramda";

const Edital = ({ mostraAlerta, edital : _edital }) => {
  const [visivel, setVisivel] = useState(false);
  const [visivelCancelar, setVisivelCancelar] = useState(false);
  const [edital, setEdital] = useState(_edital || {});
  const [modoVisualizacao, setModoVisualizacao] = useState(true);
  const [incluir, setIncluir] = useState(true);
  const [modalExcluir, setmodalExcluir] = useState(false);
  const [modalDuplicar, setmodalDuplicar] = useState(false);

  useEffect(() => {
    const parametro = getUrlParams();
    if (!parametro.uuid) {
      setIncluir(false);
      setModoVisualizacao(false);
    }
  }, [edital]);

  const fechaDialog = () => {
    setVisivel(false);
  };

  const exibeDialog = () => {
    setVisivel(true);
  };

  const editaGrupo = (index, grupo) => {
    if (edital.grupos_de_obrigacao) {
      edital.grupos_de_obrigacao[index] = grupo;
    } else {
      edital.grupos_de_obrigacao = [];
      edital.grupos_de_obrigacao[index] = grupo;
    }
    setEdital({ ...edital });
  };

  const addGrupo = () => setEdital({
     ...edital,
     grupos_de_obrigacao: R.append({ nome: "" }, edital.grupos_de_obrigacao)
    });


  const excluirGrupo = index => {
    setEdital({
      ...edital,
      grupos_de_obrigacao: R.remove(index, 1, edital.grupos_de_obrigacao)
    });
  };

  const confirmarEdital = async () => {
    const resultado = await criaEdital(edital);
    if (resultado.status === CREATED) {
      setFlashMessage("Edital criado com sucesso", "sucesso");
      redirect("#/listar-editais");
    }
  };

  const alterarEdital = async () => {
    const resultado = await alteraEdital(edital);
    if (resultado.status === OK) {
      setFlashMessage("Edital alterado com sucesso", "sucesso");
      redirect("#/listar-editais");
    }
  };

  const excluirEdital = async () => {
    const resultado = await excluiEdital(edital.uuid);
    if (resultado.status === NO_CONTENT) {
      setFlashMessage("Edital excluído com sucesso", "sucesso");
      redirect("#/listar-editais/");
    } else {
      redirect("#/listar-editais/");
      setFlashMessage(
        "Edital não pode ser excluido! Este edital está vinculado a um ou mais contratos.",
        "error"
      );
    }
  };

  const duplicaEdital = async () => {
    setmodalDuplicar(false);
    const copia = R.omit(['uuid', 'criado_em', 'alterado_em', 'titulo'], edital)
    const resultado = await criaEdital({...copia, titulo: `${ edital.titulo } Cópia`});
    if (resultado.status === CREATED) {
      setEdital(resultado.data);
      setFlashMessage("Edital duplicado com sucesso", "sucesso");
      redirect(`#/edital/?uuid=${resultado.data.uuid}`);
    }
  };

  const mostraAlertaContainer = useCallback(
    () => {
      mostraAlerta();
    },
    [mostraAlerta]
  );

  const habilitaBotao =
    modoVisualizacao === false && edital.titulo && edital.grupos_de_obrigacao
      ? false
      : true;
  const mensagemConfirmacao = incluir
    ? "Confirma a alteração deste edital?"
    : "Confirma a criação de um novo edital?";

  const footerModalExcluir = (
    <div>
      <Button
        label="Sim"
        style={{ marginRight: ".25em" }}
        onClick={excluirEdital}
        className="btn-coad-background-outline"
      />

      <Button
        label="Não"
        style={{ marginRight: ".25em" }}
        onClick={() => setmodalExcluir(false)}
      />
    </div>
  );

  const footerModaDuplicar = (
    <div>
      <Button
        label="Sim"
        style={{ marginRight: ".25em" }}
        onClick={duplicaEdital}
        className="btn-coad-background-outline"
      />

      <Button
        label="Não"
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
            label="Excluir Edital"
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
          onClick={() => redirect("#/listar-editais")}
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
              label="Sim"
              onClick={() => {
                setFlashMessage(
                  "Alterações canceladas",
                  "sucesso"
                );
                redirect("/#/listar-editais");
              }}
            />
            <Button
              className="btn-coad-primary mx-2"
              onClick={() => setVisivelCancelar(false)}
              label="Não"
            />
          </FormGroup>
        }
      >
        <span>Deseja cancelar alterações desse edital?</span>
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
            label="Não"
          />
          {!incluir ? (
            <Button
              disabled={habilitaBotao}
              className="btn-coad-primary"
              label="Sim"
              onClick={confirmarEdital}
            />
          ) : (
            <Button
              disabled={habilitaBotao}
              className="btn-coad-primary"
              label="Sim"
              onClick={alterarEdital}
            />
          )}
        </FormGroup>
      </Dialog>
      <Row>
        <Col lg={6} xl={6}>
          <h6>
            <i className="fas fa-sm fa-file-signature" /> Edital
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
        <Label className="font-weight-bold">Título do Edital</Label>
        <Input
          value={ edital.titulo || ""}
          onChange={e => setEdital({ ...edital, titulo: e.target.value })}
          autoComplete={false}
          disabled={modoVisualizacao}
        />
      </FormGroup>
      <FormGroup>
        <Label className="font-weight-bold">Grupo(s) de obrigação</Label>
        {edital.grupos_de_obrigacao ? (
          edital.grupos_de_obrigacao.map((grupo, i) => (
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
            label="Excluir Edital"
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
          onClick={() => redirect("#/listar-editais")}
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
          <p>Deseja excluir este edital? </p>
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
          <p>Deseja duplicar este edital?</p>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default Edital;
