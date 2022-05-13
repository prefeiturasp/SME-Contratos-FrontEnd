import React, { useState, useEffect, useRef } from "react";
import { FormGroup, Label, Button as ButtonBootstrap } from "reactstrap";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Switch } from "antd";
import { CREATED, OK, BAD_REQUEST } from "http-status-codes";
import { redirect } from "../../utils/redirect";
import { getUrlParams } from "../../utils/params";
import { Row, Col } from "reactstrap";

import useToast from "../../hooks/useToast";
import Container from "../../components/Global/Container";
import Page from "../../components/Global/Page";

import "./style.scss";
import { InputMask } from "primereact/inputmask";
import {
  alteraDotacaoOrcamentaria,
  criaDotacaoOrcamentaria,
  getDotacaoOrcamentaria,
} from "../../service/DotacaoOrcamentaria.service";

const DotacaoOrcamentaria = () => {
  const { uuid } = getUrlParams();

  const [visivel, setVisivel] = useState(false);
  const [dotacao, setDotacao] = useState({});
  const [modoVisualizacao, setModoVisualizacao] = useState(true);
  const [incluir, setIncluir] = useState(true);
  const inputs = useRef([]);
  const toast = useToast();

  useEffect(() => {
    if (uuid) {
      (async () => {
        const dados = await getDotacaoOrcamentaria(uuid);
        setDotacao(dados);
      })();
    }
  }, [uuid, setDotacao]);

  useEffect(() => {
    const parametro = getUrlParams();
    if (!parametro.uuid) {
      setIncluir(false);
      setModoVisualizacao(false);
    }
  }, [dotacao]);

  const fechaDialog = () => {
    setVisivel(false);
  };

  const exibeDialog = () => {
    setVisivel(true);
  };

  const criarProduto = async () => {
    try {
      const resultado = await criaDotacaoOrcamentaria(dotacao);
      if (resultado.status === CREATED) {
        toast.showSuccess("Dotação Orçamentária cadastrada com sucesso!");
        redirect("#/orcamento");
      }
    } catch (erro) {
      if (erro.response && erro.response.status === BAD_REQUEST) {
        toast.showError(`${Object.values(erro.response.data).join("\r\n")}`);
      }
    }
    fechaDialog();
  };

  const alterarProduto = async () => {
    try {
      const resultado = await alteraDotacaoOrcamentaria(dotacao);
      if (resultado.status === OK) {
        toast.showSuccess("Dotação alterada com sucesso");
        redirect("#/orcamento");
      }
    } catch (erro) {
      if (erro.response && erro.response.status === BAD_REQUEST) {
        toast.showError(`${Object.values(erro.response.data).join("\r\n")}`);
      }
    }
    fechaDialog();
  };

  const mudaFocoInput = index => {
    inputs.current[index].inputRef.current.focus();
  };

  const mensagemConfirmacao = incluir
    ? "Confirma a alteração desta dotação?"
    : "Confirma a criação de uma nova dotação?";

  const habilitaBotao =
    !modoVisualizacao &&
    dotacao.orgao &&
    dotacao.unidade &&
    dotacao.funcao &&
    dotacao.subfuncao &&
    dotacao.projeto_atividade &&
    dotacao.conta_despesa &&
    dotacao.fonte;

  return (
    <>
      <Page>
        <h4>
          {uuid
            ? "Dotação " + dotacao.numero_dotacao
            : "Adicionar dotação orçamentária"}
        </h4>
        <Container>
          <FormGroup className="d-flex flex-row-reverse mt-3">
            <Button
              disabled={!habilitaBotao}
              className="btn-coad-primary"
              label="Salvar"
              onClick={exibeDialog}
            />
            <Button
              className="btn-coad-background-outline mr-2"
              label="Cancelar"
              onClick={async () => {
                toast.showSuccess("Alterações canceladas");
                await setDotacao({});
                mudaFocoInput(0);
              }}
            />
            <ButtonBootstrap
              onClick={() => redirect("#/orcamento")}
              className="btn-coad-blue mx-2"
            >
              <i className="fas fa-arrow-left" /> Voltar
            </ButtonBootstrap>
          </FormGroup>
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
                  className="btn-coad-primary"
                  label="Sim"
                  onClick={criarProduto}
                />
              ) : (
                <Button
                  className="btn-coad-primary"
                  label="Sim"
                  onClick={alterarProduto}
                />
              )}
            </FormGroup>
          </Dialog>
          <Row>
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
          <span className="sub-titulo">Adicionar dotação orçamentária</span>
          <br />
          <div className="p-grid">
            <div className="p-col-1">
              <Label className="font-weight-bold">Órgão</Label>
              <InputMask
                ref={ref => (inputs.current[0] = ref)}
                className="w-100"
                mask="99"
                value={dotacao.orgao}
                autoClear={false}
                onChange={e => setDotacao({ ...dotacao, orgao: e.value })}
                onComplete={() => mudaFocoInput(1)}
                disabled={modoVisualizacao}
              />
            </div>
            <span className="ponto">.</span>
            <div className="p-col-1">
              <Label className="font-weight-bold">Unidade</Label>
              <InputMask
                ref={ref => (inputs.current[1] = ref)}
                className="w-100"
                mask="99"
                value={dotacao.unidade}
                autoClear={false}
                onChange={e => setDotacao({ ...dotacao, unidade: e.value })}
                onComplete={() => mudaFocoInput(2)}
                disabled={modoVisualizacao}
              />
            </div>
            <span className="ponto">.</span>
            <div className="p-col-1">
              <Label className="font-weight-bold">Função</Label>
              <InputMask
                ref={ref => (inputs.current[2] = ref)}
                className="w-100"
                mask="99"
                value={dotacao.funcao}
                autoClear={false}
                onChange={e => setDotacao({ ...dotacao, funcao: e.value })}
                onComplete={() => mudaFocoInput(3)}
                disabled={modoVisualizacao}
              />
            </div>
            <span className="ponto">.</span>
            <div className="p-col-1">
              <Label className="font-weight-bold">Subfunção</Label>
              <InputMask
                ref={ref => (inputs.current[3] = ref)}
                className="w-100"
                mask="999"
                value={dotacao.subfuncao}
                autoClear={false}
                onChange={e => setDotacao({ ...dotacao, subfuncao: e.value })}
                onComplete={() => mudaFocoInput(4)}
                disabled={modoVisualizacao}
              />
            </div>
            <span className="ponto">.</span>
            <div className="p-col-1">
              <Label className="font-weight-bold">Programa</Label>
              <InputMask
                ref={ref => (inputs.current[4] = ref)}
                className="w-100"
                mask="9999"
                value={dotacao.programa}
                autoClear={false}
                onChange={e => setDotacao({ ...dotacao, programa: e.value })}
                onComplete={() => mudaFocoInput(5)}
                disabled={modoVisualizacao}
              />
            </div>
            <span className="ponto">.</span>
            <div className="p-col-2">
              <Label className="font-weight-bold">Projeto/Atividade</Label>
              <InputMask
                ref={ref => (inputs.current[5] = ref)}
                className="w-100"
                mask="9.999"
                value={dotacao.projeto_atividade}
                autoClear={false}
                onChange={e =>
                  setDotacao({ ...dotacao, projeto_atividade: e.value })
                }
                onComplete={() => mudaFocoInput(6)}
                disabled={modoVisualizacao}
              />
            </div>
            <span className="ponto">.</span>
            <div className="p-col-2">
              <Label className="font-weight-bold">Conta Despesa</Label>
              <InputMask
                ref={ref => (inputs.current[6] = ref)}
                className="w-100"
                mask="99999999"
                value={dotacao.conta_despesa}
                autoClear={false}
                onChange={e =>
                  setDotacao({ ...dotacao, conta_despesa: e.value })
                }
                onComplete={() => mudaFocoInput(7)}
                disabled={modoVisualizacao}
              />
            </div>
            <span className="ponto">.</span>
            <div className="p-col-1">
              <Label className="font-weight-bold">Fonte</Label>
              <InputMask
                ref={ref => (inputs.current[7] = ref)}
                className="w-100"
                mask="99"
                value={dotacao.fonte}
                autoClear={false}
                onChange={e => setDotacao({ ...dotacao, fonte: e.value })}
                disabled={modoVisualizacao}
              />
            </div>
          </div>

          <FormGroup className="d-flex flex-row-reverse mt-3">
            <Button
              disabled={!habilitaBotao}
              className="btn-coad-primary mr-1"
              label="Salvar"
              onClick={exibeDialog}
            />
            <Button
              className="btn-coad-background-outline mr-2"
              label="Cancelar"
              onClick={async () => {
                toast.showSuccess("Alterações canceladas");
                await setDotacao({});
                mudaFocoInput(0);
              }}
            />
            <ButtonBootstrap
              onClick={() => redirect("#/orcamento")}
              className="btn-coad-blue mx-2"
            >
              <i className="fas fa-arrow-left" /> Voltar
            </ButtonBootstrap>
          </FormGroup>
        </Container>
      </Page>
    </>
  );
};

export default DotacaoOrcamentaria;
