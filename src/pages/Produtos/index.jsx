import React, { useState, useEffect } from "react";
import { FormGroup, Label } from "reactstrap";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { CREATED, OK, BAD_REQUEST } from "http-status-codes";
import { redirect } from "../../utils/redirect";
import { getUrlParams } from "../../utils/params";

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
  CATEGORIA_PRODUTO,
  GRUPO_ALIMENTAR_PRODUTO,
  TIPO_PROGRAMA,
  SITUACAO_PRODUTO,
} from "./constantes";
import "./style.scss";
import { LISTAR_PRODUTOS, PRODUTOS } from "../../configs/urls.constants";

const Produtos = () => {
  const { uuid } = getUrlParams();

  const [visivel, setVisivel] = useState(false);
  const [visivelCancelar, setVisivelCancelar] = useState(false);
  const [produto, setProduto] = useState({});
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

  const formatarProduto = () => {
    let produtoFormatado = { ...produto };
    produtoFormatado.unidade_medida = produto.unidade_medida.uuid;
    produtoFormatado.nome = produto.nome;
    produtoFormatado.situacao = produto.situacao.id;
    produtoFormatado.categoria = produto.categoria.id;
    produtoFormatado.tipo_programa = produto.tipo_programa
      ? produto.tipo_programa.id
      : "";
    produtoFormatado.grupo_alimentar = produto.grupo_alimentar
      ? produto.grupo_alimentar.id
      : "";
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
        toast.showSuccess("Cadastro alterado com sucesso");
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
    ? "Deseja salvar as alterações do cadastro?"
    : "Confirma a criação de um novo produto?";

  const mensagemCancelamentoEdicao = (
    <>
      <span>Deseja cancelar preenchimento das informações?</span>
      <br />
      <span>Os dados inseridos não serão salvos</span>
    </>
  );

  const habilitaBotao = () => {
    let habilitar =
      produto.nome &&
      produto.unidade_medida &&
      produto.categoria &&
      produto.situacao;

    if (produto.categoria && produto.categoria.id === CATEGORIA_PRODUTO[0].id) {
      habilitar = habilitar && produto.grupo_alimentar && produto.tipo_programa;
    }

    return habilitar;
  };

  return (
    <>
      <Page
        breadcrumb={[
          { label: "Cadastros" },
          { label: "Produtos", url: "#" + LISTAR_PRODUTOS },
          { label: "Novo Produto", url: "#" + PRODUTOS },
        ]}
        titulo={uuid ? "Produto " + produto.nome : "Cadastro de Produtos"}
        onClickVoltar={() => redirect("#/listar-produtos")}
      >
        <Container>
          <Dialog
            header={"Cancelar preenchimento"}
            visible={visivelCancelar}
            style={{ width: "60vw" }}
            modal={true}
            onHide={() => setVisivelCancelar(false)}
            footer={
              <FormGroup className="pt-4 d-flex justify-content-end">
                <Button
                  disabled={!habilitaBotao()}
                  className="btn-coad-background-outline"
                  onClick={() => setVisivelCancelar(false)}
                  label="Não"
                />
                <Button
                  className="btn-coad-primary mx-2"
                  label="Sim"
                  onClick={() => {
                    toast.showSuccess("Alterações canceladas");
                    redirect("/#/listar-produtos");
                  }}
                />
              </FormGroup>
            }
          >
            {incluir ? (
              mensagemCancelamentoEdicao
            ) : (
              <span>Deseja cancelar alterações desse produto?</span>
            )}
          </Dialog>
          <Dialog
            header={"Salvar alterações"}
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
          <br />
          <span className="sub-titulo">Informações do Produto</span>
          <br />
          <div className="p-grid">
            <div className="p-col-4">
              <Label className="font-weight-bold w-100">
                Nome do produto <span className="obrigatorio">*</span>
              </Label>
              <InputText
                className="w-100 pr-2"
                value={produto.nome}
                format={false}
                onChange={e =>
                  setProduto({ ...produto, nome: e.target.value.toUpperCase() })
                }
              />
            </div>
            <div className="p-col-4">
              <Label className="font-weight-bold">
                Unidade de Medida <span className="obrigatorio">*</span>
              </Label>
              <SelecionaUnidadesDeMedida
                className="w-100"
                unidade_medida={produto.unidade_medida}
                onSelect={e => setProduto({ ...produto, unidade_medida: e })}
              />
            </div>
            <div className="p-col-4">
              <Label className="font-weight-bold">
                Categoria <span className="obrigatorio">*</span>
              </Label>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={CATEGORIA_PRODUTO}
                value={produto.categoria}
                onChange={e => validaCategoria(e.target.value)}
                placeholder="Selecione"
              />
            </div>
          </div>

          <div className="p-grid">
            <div className="p-col-4">
              <Label className="font-weight-bold">
                Status <span className="obrigatorio">*</span>
              </Label>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={SITUACAO_PRODUTO}
                value={produto.situacao}
                onChange={e =>
                  setProduto({ ...produto, situacao: e.target.value })
                }
                placeholder="Selecione"
              />
            </div>

            {produto.categoria &&
              produto.categoria.id === CATEGORIA_PRODUTO[0].id && (
                <>
                  <div className="p-col-4">
                    <Label className="font-weight-bold">
                      Grupo Alimentar <span className="obrigatorio">*</span>
                    </Label>
                    <Dropdown
                      className="w-100"
                      optionLabel="nome"
                      options={GRUPO_ALIMENTAR_PRODUTO}
                      value={produto.grupo_alimentar}
                      onChange={e =>
                        setProduto({
                          ...produto,
                          grupo_alimentar: e.target.value,
                        })
                      }
                      placeholder="Selecione"
                    />
                  </div>
                  <div className="p-col-4">
                    <Label className="font-weight-bold">
                      Tipo de Programa <span className="obrigatorio">*</span>
                    </Label>
                    <Dropdown
                      className="w-100"
                      optionLabel="nome"
                      options={TIPO_PROGRAMA}
                      value={produto.tipo_programa}
                      onChange={e =>
                        setProduto({
                          ...produto,
                          tipo_programa: e.target.value,
                        })
                      }
                      placeholder="Selecione"
                    />
                  </div>
                </>
              )}
          </div>

          <FormGroup className="d-flex flex-row-reverse mt-3">
            <Button
              disabled={!habilitaBotao()}
              className="btn-coad-primary mr-1"
              label="Salvar"
              onClick={exibeDialog}
            />
            <Button
              disabled={!habilitaBotao()}
              className="btn-coad-background-outline mr-2"
              label="Cancelar"
              onClick={() => setVisivelCancelar(true)}
            />
          </FormGroup>
        </Container>
      </Page>
    </>
  );
};

export default Produtos;
