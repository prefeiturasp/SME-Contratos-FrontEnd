import React, { useState, useEffect } from "react";
import { FormGroup, Label, Button as ButtonBootstrap } from "reactstrap";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Switch } from "antd";
import { CREATED, OK, BAD_REQUEST } from "http-status-codes";
import { redirect } from "../../utils/redirect";
import { getUrlParams } from "../../utils/params";
import { Row, Col } from "reactstrap";

import { SelecionaUnidadesDeMedida } from "../../components/Contratos/SelecionaUnidadesDeMedida";

import useToast from "../../hooks/useToast";
import Container from "../../components/Global/Container";
import Page from "../../components/Global/Page";

import {
  alteraProduto,
  criaProduto,
  getProduto,
} from "../../service/Produtos.service";
import {
  ARMAZENABILIDADE_PRODUTO,
  CATEGORIA_PRODUTO,
  DURABILIDADE_PRODUTO,
  GRUPO_ALIMENTAR_PRODUTO,
  SITUACAO_PRODUTO,
} from "./constantes";
import "./style.scss";

const Produtos = () => {
  const { uuid } = getUrlParams();

  const [visivel, setVisivel] = useState(false);
  const [visivelCancelar, setVisivelCancelar] = useState(false);
  const [produto, setProduto] = useState({});
  const [modoVisualizacao, setModoVisualizacao] = useState(true);
  const [incluir, setIncluir] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (uuid) {
      (async () => {
        const dados = await getProduto(uuid);
        setProduto(dados);
      })();
    }
  }, [uuid, setProduto]);

  useEffect(() => {
    const parametro = getUrlParams();
    if (!parametro.uuid) {
      setIncluir(false);
      setModoVisualizacao(false);
    }
  }, [produto]);

  const fechaDialog = () => {
    setVisivel(false);
  };

  const exibeDialog = () => {
    setVisivel(true);
  };

  const validaCategoria = value => {
    if (value.id === CATEGORIA_PRODUTO[1].id) {
      setProduto({
        ...produto,
        categoria: value,
        grupo_alimentar: "",
        durabilidade: "",
      });
    } else {
      setProduto({ ...produto, categoria: value });
    }
  };

  const defineDurabilidadeEArmazenabilidade = value => {
    const grupo_alimentar = value.id;
    switch (grupo_alimentar) {
      case GRUPO_ALIMENTAR_PRODUTO[0].id:
        setProduto({
          ...produto,
          grupo_alimentar: value,
          durabilidade: DURABILIDADE_PRODUTO[0],
          armazenabilidade: ARMAZENABILIDADE_PRODUTO[0],
        });
        break;
      case GRUPO_ALIMENTAR_PRODUTO[1].id:
        setProduto({
          ...produto,
          grupo_alimentar: value,
          durabilidade: DURABILIDADE_PRODUTO[0],
          armazenabilidade: ARMAZENABILIDADE_PRODUTO[1],
        });
        break;
      case GRUPO_ALIMENTAR_PRODUTO[2].id:
        setProduto({
          ...produto,
          grupo_alimentar: value,
          durabilidade: DURABILIDADE_PRODUTO[0],
          armazenabilidade: ARMAZENABILIDADE_PRODUTO[1],
        });
        break;
      case GRUPO_ALIMENTAR_PRODUTO[3].id:
        setProduto({
          ...produto,
          grupo_alimentar: value,
          durabilidade: DURABILIDADE_PRODUTO[1],
          armazenabilidade: ARMAZENABILIDADE_PRODUTO[0],
        });
        break;
      default:
        break;
    }
  };

  const formatarProduto = () => {
    let produtoFormatado = { ...produto };
    produtoFormatado.unidade_medida = produto.unidade_medida.uuid;
    produtoFormatado.nome = produto.nome;
    produtoFormatado.situacao = produto.situacao.id;
    produtoFormatado.categoria = produto.categoria.id;
    produtoFormatado.grupo_alimentar = produto.grupo_alimentar
      ? produto.grupo_alimentar.id
      : "";
    produtoFormatado.durabilidade = produto.durabilidade
      ? produto.durabilidade.id
      : "";
    produtoFormatado.armazenabilidade = produto.armazenabilidade.id;
    return produtoFormatado;
  };

  const criarProduto = async () => {
    let produtoFormatado = formatarProduto();
    try {
      const resultado = await criaProduto(produtoFormatado);
      if (resultado.status === CREATED) {
        toast.showSuccess("Produto criado com sucesso");
        redirect("#/listar-produtos");
      }
    } catch (erro) {
      if (erro.response && erro.response.status === BAD_REQUEST) {
        toast.showError(`${Object.values(erro.response.data).join("\r\n")}`);
      }
    }
    fechaDialog();
  };

  const alterarProduto = async () => {
    let produtoFormatado = formatarProduto();
    try {
      const resultado = await alteraProduto(produtoFormatado);
      if (resultado.status === OK) {
        toast.showSuccess("Produto alterado com sucesso");
        redirect("#/listar-produtos");
      }
    } catch (erro) {
      if (erro.response && erro.response.status === BAD_REQUEST) {
        toast.showError(`${Object.values(erro.response.data).join("\r\n")}`);
      }
    }
    fechaDialog();
  };

  const mensagemConfirmacao = incluir
    ? "Confirma a alteração deste produto?"
    : "Confirma a criação de um novo produto?";

  const habilitaBotao =
    !modoVisualizacao &&
    produto.nome &&
    produto.unidade_medida &&
    produto.categoria &&
    produto.armazenabilidade &&
    produto.situacao;

  return (
    <>
      <Page>
        <h4>{uuid ? "Produto " + produto.nome : "Cadastro de Produtos"}</h4>
        <Container>
          <FormGroup className="d-flex flex-row-reverse mt-3">
            <Button
              disabled={!habilitaBotao}
              className="btn-coad-primary"
              label="Salvar"
              onClick={exibeDialog}
            />
            <Button
              disabled={!habilitaBotao}
              className="btn-coad-background-outline mr-2"
              label="Cancelar"
              onClick={() => setVisivelCancelar(true)}
            />
            <ButtonBootstrap
              onClick={() => redirect("#/listar-produtos")}
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
                  disabled={!habilitaBotao}
                  className="btn-coad-background-outline"
                  label="Sim"
                  onClick={() => {
                    toast.showSuccess("Alterações canceladas");
                    redirect("/#/listar-produtos");
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
            <span>Deseja cancelar alterações desse produto?</span>
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
          <span className="sub-titulo">Informações do Produto</span>
          <br />
          <div className="p-grid">
            <div className="p-col-8">
              <Label className="font-weight-bold w-100">Nome do produto</Label>
              <InputText
                className="w-100 pr-2"
                value={produto.nome}
                format={false}
                onChange={e =>
                  setProduto({ ...produto, nome: e.target.value.toUpperCase() })
                }
                disabled={modoVisualizacao}
              />
            </div>
            <div className="p-col-4">
              <Label className="font-weight-bold">Unidade de Medida</Label>
              <SelecionaUnidadesDeMedida
                className="w-100"
                unidade_medida={produto.unidade_medida}
                onSelect={e => setProduto({ ...produto, unidade_medida: e })}
                disabled={modoVisualizacao}
              />
            </div>
          </div>
          <br />
          <hr />
          <div className="p-grid">
            <div className="p-col-4">
              <Label className="font-weight-bold">Categoria</Label>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={CATEGORIA_PRODUTO}
                value={produto.categoria}
                onChange={e => validaCategoria(e.target.value)}
                placeholder="Selecione"
                disabled={modoVisualizacao}
              />
            </div>
            <div className="p-col-4">
              <Label className="font-weight-bold">Grupo Alimentar</Label>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={GRUPO_ALIMENTAR_PRODUTO}
                value={produto.grupo_alimentar}
                onChange={e =>
                  defineDurabilidadeEArmazenabilidade(e.target.value)
                }
                placeholder="Selecione"
                disabled={
                  modoVisualizacao ||
                  (produto.categoria &&
                    produto.categoria.id === CATEGORIA_PRODUTO[1].id)
                }
              />
            </div>
            <div className="p-col-4">
              <Label className="font-weight-bold">Durabilidade</Label>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={DURABILIDADE_PRODUTO}
                value={produto.durabilidade}
                onChange={e =>
                  setProduto({ ...produto, durabilidade: e.target.value })
                }
                placeholder="Selecione"
                disabled={true}
              />
            </div>
            <div className="p-col-4">
              <Label className="font-weight-bold">Armazenabilidade</Label>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={ARMAZENABILIDADE_PRODUTO}
                value={produto.armazenabilidade}
                onChange={e =>
                  setProduto({ ...produto, armazenabilidade: e.target.value })
                }
                placeholder="Selecione"
                disabled={
                  modoVisualizacao ||
                  (produto.categoria &&
                    produto.categoria.id === CATEGORIA_PRODUTO[0].id)
                }
              />
            </div>
            <div className="p-col-4">
              <Label className="font-weight-bold">Situação</Label>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={SITUACAO_PRODUTO}
                value={produto.situacao}
                onChange={e =>
                  setProduto({ ...produto, situacao: e.target.value })
                }
                placeholder="Selecione"
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
              disabled={!habilitaBotao}
              className="btn-coad-background-outline mr-2"
              label="Cancelar"
              onClick={() => setVisivelCancelar(true)}
            />
            <ButtonBootstrap
              onClick={() => redirect("#/listar-produtos")}
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

export default Produtos;
