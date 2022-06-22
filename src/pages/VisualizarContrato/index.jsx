import React, { useEffect, useRef, useState } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import CardSuperior from "./CardSuperior";
import CoadAccordion from "../../components/Global/CoadAccordion";
import { SelecionaTipoServico } from "../../components/Contratos/SelecionaTipoServico";
import { Button, Col, Row, FormGroup, Label, Card, Input } from "reactstrap";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import EditorHeader from "../../components/Shared/EditorHeader";
import Anexos from "./Anexos";
import {
  createContrato,
  getContratoByUUID,
  updateContrato,
} from "../../service/Contratos.service";
import { getUrlParams } from "../../utils/params";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import {
  CALENDAR_PT,
  REFERENCIA_ENCERRAMENTO,
} from "../../configs/config.constants";
import SituacaoRadio from "../../components/Contratos/SelecionaSituacaoContrato/SituacaoRadio";
import SelecionarNucleos from "../../components/Contratos/SelecionarNucleos";
import { BuscaIncrementalServidores } from "../../components/Contratos/BuscaIncrementalServidores";
import { redirect } from "../../utils/redirect";
import { mapStateToPayload, corDoPrazo } from "./helpers";
import { Dialog } from "primereact/dialog";
import { getUsuariosLookup } from "../../service/Usuarios.service";
import DotacoesOrcamentarias from "./DotacoesOrcamentarias";
import { Button as AntButton, Switch } from "antd";
import $ from "jquery";
import moment from "moment";
import { criaTipoServico } from "../../service/TiposServico.service";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { UnidadesEnvolvidas } from "../CadastrarContrato/UnidadesEnvolvidas";
import { SelecionaEdital } from "../../components/Contratos/SelecionaEditalContrato";
import { AccordionEmpresaContratada } from "../../components/Contratos/AccordionEmpresaContratada";
import SelecionaAta from "../../components/Contratos/SelecionaAta";
import {
  GESTAO_CONTRATOS,
  VISUALIZAR_CONTRATOS,
} from "../../configs/urls.constants";
import useToast from "../../hooks/useToast";

const nullToUndef = v => (v === null ? undefined : v);
const { DATA_ASSINATURA, DATA_ORDEM_INICIO } = REFERENCIA_ENCERRAMENTO;

const referenciaEncerramentoOptions = [
  { label: "Data da assinatura", value: DATA_ASSINATURA },
  { label: "Data da ordem de início", value: DATA_ORDEM_INICIO },
];

const stateInicial = {
  coordenador: null,
  termo_contrato: null,
  tipo_servico: null,
  tipoServicoSelecionado: null,
  data_ordem_inicio: null,
  data_assinatura: null,
  situacao: null,
  observacoes: "",
  situacaoContrato: [],
  gestor: null,
  nucleo: null,
  estado: null,
  unidades: [],
  tipoServico: null,
  disabilitado: true,
  processo: null,
  vigencia: null,
  dotacoes_orcamentarias: [],
  modalEdicao: false,
  modalCadastro: false,
  usernameGestor: null,
  usuarios: [],
  totalMensal: 0.0,
  dataEncerramento: null,
  referencia_encerramento: DATA_ORDEM_INICIO,
  unidades_selecionadas: [],
  valor_total: "",
  unidade_vigencia: "DIAS",
  edital: null,
  ata: null,
  alteracaoEdital: null,
  objeto_edital: null,
  objeto: "",
  descricao_objeto_edital: "",
  descricao_objeto_contrato: "",
  modalCadastrarObjeto: false,
  novoObjeto: "",
};

const VisualizarContratos = () => {
  const toast = useToast();
  const tipoServicoRef = useRef(null);
  const [state, setState] = useState(stateInicial);

  const [incluir, setIncluir] = useState(true);
  const [contrato, setContrato] = useState({});
  const [empresa, setEmpresa] = useState({});
  const [dotacoes, setDotacoes] = useState({});
  const [valorTotal, setValorTotal] = useState({});
  const [gestao, setGestao] = useState({});
  const [docsDre, setDocsDre] = useState({});
  const [modoVisualizacao, setModoVisualizacao] = useState(true);
  addLocale("pt", CALENDAR_PT);

  useEffect(async () => {
    const param = getUrlParams();

    const usuarios = await getUsuariosLookup();
    if (param.uuid) {
      const contrato = await getContratoByUUID(param.uuid);
      setState({
        ...state,

        usuarios,
      });

      setIncluir(false);
      propsToState(contrato);
      $(".ql-editor").prop("contenteditable", "false");
    } else {
      setState({
        ...state,
        usuarios,
      });
      setModoVisualizacao(false);
    }
  }, []);

  const propsToState = contrato => {
    const tipo_servico = contrato.edital
      ? contrato.edital.objeto
      : contrato.tipo_servico || { nome: "", uuid: "" };
    const empresa_contratada = contrato.empresa_contratada || { nome: "" };
    setEmpresa(empresa_contratada);
    setContrato({
      termo_contrato: contrato.termo_contrato,
      processo: contrato.processo,
      situacao: contrato.situacao,
      edital: contrato.edital,
      ata: contrato.ata,
      data_assinatura: contrato.data_assinatura
        ? moment(contrato.data_assinatura, "YYYY-MM-DD")
        : null,
      data_ordem_inicio: contrato.data_ordem_inicio
        ? moment(contrato.data_ordem_inicio, "YYYY-MM-DD")
        : null,
      vigencia: contrato.vigencia,
      unidade_vigencia: contrato.unidade_vigencia,
      data_encerramento: contrato.data_encerramento,
      dataEncerramento: contrato.data_encerramento
        ? moment(contrato.data_encerramento, "YYYY-MM-DD")
        : null,
    });
    const dotacoes = contrato.dotacoes.map(el => ({
      empenhos: el.empenhos.map(emp => ({
        ...emp,
        valor_previsto: parseFloat(emp.valor_previsto),
      })),
      ...el.dotacao_orcamentaria,
      valor: parseFloat(el.valor),
    }));
    setDotacoes(dotacoes);

    setGestao({
      coordenador: contrato.coordenador,
      usernameGestor: contrato.gestor ? contrato.gestor.username : "",
      gestor: contrato.gestor ? contrato.gestor.uuid : "",
      nucleo_responsavel: contrato.nucleo_responsavel
        ? contrato.nucleo_responsavel.uuid
        : "",
    });

    setState({
      ...state,
      tipoServico: tipo_servico.nome,
      tipoServicoSelecionado: tipo_servico,
      tipo_servico: tipo_servico,
      tipo_servico_uuid: tipo_servico.uuid,

      totalMensal: contrato.total_mensal,
      observacoes: contrato.observacoes,
      estado: contrato.estado_contrato,

      valor_total: parseFloat(contrato.valor_total),

      objeto_edital: contrato.edital ? contrato.edital.objeto : null,
      objeto: contrato.edital
        ? contrato.edital.descricao_objeto
        : contrato.objeto,
      descricao_objeto_edital: contrato.edital
        ? contrato.edital.descricao_objeto
        : "",
      descricao_objeto_contrato: contrato.edital
        ? contrato.edital.descricao_objeto
        : contrato.objeto,
    });
  };

  const selecionarDocsDre = files => {
    const docs = Array.from(files);
    setDocsDre(docs);
  };

  const alteraDiasVigencia = dias => {
    setContrato({ ...contrato, vigencia: dias });
  };

  const alteraDataAssinatura = data => {
    const data_assinatura = moment(data).format("YYYY-MM-DD");
    setContrato({ ...contrato, data_assinatura });
  };

  const alteraDataOrdemInicio = data => {
    const data_ordem_inicio = moment(data).format("YYYY-MM-DD");
    setContrato({ ...contrato, data_ordem_inicio });
  };

  const alteraReferenciaEncerramento = referencia_encerramento => {
    setContrato({ ...contrato, referencia_encerramento });
  };

  const habilitarEdicao = () => {
    setModoVisualizacao(!modoVisualizacao);
    contrato.edital
      ? $(".ql-editor").prop("contenteditable", !modoVisualizacao.toString())
      : $(".ql-editor").prop("contenteditable", modoVisualizacao.toString());
  };

  const handleSubmitEditar = async () => {
    const { uuid } = contrato;
    //TODO: corrigir mapstate
    const payload = mapStateToPayload(state, incluir);
    setModoVisualizacao(true);
    setState({ ...state, modalEdicao: false });
    toast.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Alterações realizadas com sucesso",
      life: 7000,
    });
    $(".ql-editor").prop("contenteditable", modoVisualizacao.toString());
    const resultado = await updateContrato(payload, uuid);
    if (resultado.status === OK) {
      setState({
        ...state,
        dataEncerramento: moment(resultado.data.data_encerramento).format(
          "DD/MM/YYYY",
        ),
        contrato: {
          ...state.contrato,
          dias_para_o_encerramento: resultado.data.dias_para_o_encerramento,
          edital:
            typeof resultado.data.edital === "object"
              ? resultado.data.edital
              : state.contrato.edital,
        },
      });

      setContrato({
        ...contrato,
        dias_para_o_encerramento: resultado.data.dias_para_o_encerramento,
        edital:
          typeof resultado.data.edital === "object"
            ? resultado.data.edital
            : state.contrato.edital,
      });
      cancelaAtualizacao();
      window.scrollTo(0, 0);
    } else {
      alert("Ocorreu um erro, tente novamente!");
    }
  };

  const handleSubmitCadastro = async () => {
    const { uuid } = contrato;
    //TODO: corrigir mapstate
    const payload = mapStateToPayload(state, incluir);

    const resultado = await createContrato(payload, uuid);
    if (resultado.uuid) {
      toast.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Contrato criado com sucesso",
        life: 7000,
      });
      redirect("/#/gestao-contratos");
    } else {
      toast.show({
        severity: "error",
        detail: "Ocorreu um erro, tente novamente!",
        life: 7000,
      });
    }
  };

  const handleConfimarEdicao = () => {
    setState({ ...state, modalEdicao: true });
  };

  const handleConfimarCriacao = () => {
    setState({ ...state, modalCadastro: true });
  };

  const cancelaAtualizacao = () => {
    setState({ ...state, modalEdicao: false });
  };

  const cancelaCadastro = () => {
    setState({ ...state, modalCadastro: false });
  };

  const cancelaModalObjeto = () => {
    setState({ ...state, modalCadastrarObjeto: false });
  };

  const CadastraObjeto = async () => {
    setState({ ...state, modalCadastrarObjeto: false });
    try {
      const resultado = await criaTipoServico({ nome: state.novoObjeto });
      if (resultado.status === CREATED) {
        tipoServicoRef.current.buscaTiposServico();
        toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Objeto cadastrado com sucesso!",
          life: 7000,
        });
      }
    } catch (erro) {
      if (erro.response && erro.response.status === BAD_REQUEST) {
        toast.show({
          severity: "error",
          summary: "Erro",
          detail: erro.response.data,
          life: 7000,
        });
      }
    }
    setState({ ...state, novoObjeto: "" });
  };

  const calculaDataEncerramento = (
    data_assinatura,
    data_ordem_inicio,
    referencia,
    vigencia,
    unidade,
  ) => {
    if (typeof data_assinatura === "string") {
      data_assinatura = moment(data_assinatura, "YYYY-MM-DD");
    }
    if (typeof data_ordem_inicio === "string") {
      data_ordem_inicio = moment(data_ordem_inicio, "YYYY-MM-DD");
    }
    let dataInicio =
      referencia === DATA_ASSINATURA
        ? moment(data_assinatura)
        : moment(data_ordem_inicio);
    if (!dataInicio || !vigencia || !unidade) {
      setState({ ...state, dataEncerramento: "" });
      return false;
    }
    if (unidade === "DIAS") {
      let data_encerramento = dataInicio.add("days", vigencia);
      let vencimento = data_encerramento.diff(moment(), "days");
      setContrato({
        ...state.contrato,
        dias_para_o_encerramento: vencimento,
      });
      return data_encerramento.format("DD/MM/yyyy");
    } else {
      let data_encerramento = dataInicio
        .add("months", vigencia)
        .subtract(1, "days");
      let vencimento = data_encerramento.diff(moment(), "days");
      setContrato({
        ...state.contrato,
        dias_para_o_encerramento: vencimento,
      });
      return data_encerramento.format("DD/MM/yyyy");
    }
  };

  const validaDotacoes = () => {
    if (!dotacoes.length) return false;
    else {
      let validas = dotacoes.filter(dotacao => dotacao.valor);
      return validas.length !== 0 && state.valor_total;
    }
  };

  const {
    tipoServico,
    tipo_servico,
    observacoes,
    estado,
    modalEdicao,
    modalCadastro,
    usuarios,
    objeto_edital,
    descricao_objeto_edital,
    descricao_objeto_contrato,
    modalCadastrarObjeto,
    novoObjeto,
  } = state;

  const {
    termo_contrato,
    processo,
    situacao,
    edital,
    ata,
    data_assinatura,
    data_ordem_inicio,
    referencia_encerramento,
    vigencia,
    unidade_vigencia,
    dataEncerramento,
  } = contrato;

  const { gestor, usernameGestor, nucleo_responsavel, coordenador } = gestao;

  const habilitaBotao =
    termo_contrato &&
    processo &&
    situacao &&
    data_assinatura &&
    data_ordem_inicio &&
    referencia_encerramento &&
    vigencia &&
    dataEncerramento &&
    validaDotacoes();

  return (
    <>
      <Page
        titulo={
          contrato.termo_contrato
            ? `Termo de Contrato n. ${contrato.termo_contrato} - ${
                empresa ? empresa.nome : ""
              }`
            : "Novo Termo de Contrato"
        }
        breadcrumb={[
          { label: "Contratos" },
          { label: "Gestão de Contratos", url: "#" + GESTAO_CONTRATOS },
          { label: "Novo Contrato", url: "#" + VISUALIZAR_CONTRATOS },
        ]}
      >
        <CardSuperior
          tipoServico={tipoServico}
          situacaoContratual={estado}
          estadoContrato={situacao || ""}
          totalmensal={contrato.total_mensal}
          dataEncerramento={contrato.data_encerramento}
          diasEncerramento={contrato.dias_para_o_encerramento}
        />
        <Container>
          <Dialog
            header="Aplicar alterações"
            visible={modalEdicao}
            style={{ width: "50vw" }}
            modal={true}
            onHide={() => cancelaAtualizacao()}
            footer={
              <div>
                <button
                  className="btn btn-coad-background-outline"
                  onClick={() => cancelaAtualizacao()}
                >
                  Não
                </button>
                <button
                  className="btn btn-coad-primary"
                  onClick={handleSubmitEditar}
                >
                  Sim
                </button>
              </div>
            }
          >
            Foram feitas alterações em contrato. Deseja aplicá-las em documento?
          </Dialog>

          <Dialog
            header="Aplicar alterações"
            visible={modalCadastro}
            style={{ width: "50vw" }}
            modal={true}
            onHide={() => cancelaCadastro()}
            footer={
              <div>
                <button
                  className="btn btn-coad-background-outline"
                  onClick={() => cancelaCadastro()}
                >
                  Não
                </button>
                <button
                  className="btn btn-coad-primary"
                  onClick={handleSubmitCadastro}
                >
                  Sim
                </button>
              </div>
            }
          >
            Deseja cadastrar este contrato?
          </Dialog>

          <Dialog
            header="Adicionar objeto"
            visible={modalCadastrarObjeto}
            style={{ width: "60vw" }}
            modal={true}
            footer={
              <div>
                <button
                  className="btn btn-coad-background-outline"
                  onClick={() => cancelaModalObjeto()}
                >
                  Cancelar
                </button>
                <button
                  onClick={CadastraObjeto}
                  className="btn btn-coad-primary"
                  disabled={!state.novoObjeto.length}
                >
                  Adicionar
                </button>
              </div>
            }
            onHide={() => cancelaModalObjeto()}
          >
            <div>
              <label htmlFor="objeto">Nome do objeto</label>
              <br />
              <InputText
                value={novoObjeto || ""}
                onChange={e =>
                  setState({
                    ...state,
                    novoObjeto: e.target.value.toUpperCase(),
                  })
                }
                className="w-100"
              />
            </div>
          </Dialog>

          <Row className="mb-3">
            <Col lg={6}>
              <Button
                className="btn btn-coad-background-outline"
                disabled={true}
              >
                <i className="fas fa-history" /> Histórico
              </Button>
            </Col>
            <Col lg={6} className="d-flex flex-row-reverse">
              <Button
                className="btn btn-coad-background-outline"
                onClick={() =>
                  incluir ? handleConfimarCriacao() : handleConfimarEdicao()
                }
                disabled={modoVisualizacao || !habilitaBotao}
              >
                Salvar
              </Button>
              <Button
                onClick={() => redirect("#/gestao-contratos")}
                className="btn-coad-blue mx-2"
              >
                <i className="fas fa-arrow-left" /> Voltar
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <h2>
                <i className="fas fa-file-signature"></i> Visualizar/Alterar
                contrato
              </h2>
            </Col>
            {!incluir && (
              <Col lg={4} className="">
                <Col className="d-flex justify-content-end">
                  <Label className="px-3">Modo de edição</Label>
                  <Switch
                    checked={!modoVisualizacao}
                    defaultChecked={false}
                    onChange={() => habilitarEdicao()}
                  />
                </Col>
              </Col>
            )}
          </Row>
          <CoadAccordion titulo={"Informações Gerais"}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <FormGroup>
                  <Label form="termoContrato">
                    Número do Termo de Contrato
                  </Label>
                  <InputText
                    id="termoContrato"
                    value={termo_contrato || ""}
                    onChange={e =>
                      setContrato({
                        ...contrato,
                        termo_contrato: e.target.value,
                      })
                    }
                    placeholder={"Ex: 001/002"}
                    className="w-100"
                    readOnly={modoVisualizacao}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <FormGroup>
                  <Label form="numeroProcesso">Número de Processo</Label>
                  <InputText
                    id="numeroProcesso"
                    value={nullToUndef(processo)}
                    onChange={e =>
                      setContrato({ ...contrato, processo: e.target.value })
                    }
                    placeholder={"Ex: 0000.2019/0000000-0"}
                    className="w-100"
                    disabled={modoVisualizacao}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <Label form="situacao">Status</Label>
                <br />
                <SituacaoRadio
                  checado={situacao}
                  onSelect={value =>
                    setContrato({ ...contrato, situacao: value })
                  }
                  disabled={modoVisualizacao}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <Label form="numeroEdital">Número do Edital</Label>
                <SelecionaEdital
                  id="numeroEdital"
                  className="w-100"
                  editalSalvo={edital}
                  onSelect={value => {
                    setState({
                      ...state,
                      alteracaoEdital: value,
                      edital: value,
                      objeto_edital: value ? value.objeto : null,
                      tipoServico: value ? value.objeto.nome : null,
                      descricao_objeto_edital: value
                        ? value.descricao_objeto
                        : null,
                      tipo_servico: value ? value.objeto : null,
                      tipo_servico_uuid: null,
                      objeto: " ",
                      descricao_objeto_contrato: value
                        ? value.descricao_objeto
                        : null,
                    });
                    setContrato({ ...contrato, edital: value });
                  }}
                  disabled={modoVisualizacao || (!incluir && !contrato.edital)}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <SelecionaAta
                  id="numeroAta"
                  className="w-100"
                  value={ata}
                  edital={edital}
                  onSelect={event => {
                    setContrato({
                      ...contrato,
                      ata: event.value,
                    });
                  }}
                  disabled={modoVisualizacao || !edital}
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm={12} xs={12} lg={9} xl={9}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3">
                    <Label>Data de Assinatura de Contrato</Label>
                    <br />

                    <Calendar
                      value={
                        data_assinatura
                          ? moment(data_assinatura).format("DD/MM/YYYY")
                          : null
                      }
                      onChange={e => {
                        alteraDataAssinatura(e.value);
                        let dataEncerramento = calculaDataEncerramento(
                          e.value,
                          data_ordem_inicio,
                          referencia_encerramento,
                          vigencia,
                          unidade_vigencia,
                        );
                        setContrato({
                          ...contrato,
                          dataEncerramento: dataEncerramento,
                        });
                      }}
                      keepInvalid={true}
                      locale="pt"
                      dateFormat="dd/mm/yy"
                      showIcon={true}
                      disabled={modoVisualizacao}
                      id="data_assinatura"
                    />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3">
                    <Label>Data da Ordem de Início</Label>
                    <br />
                    <Calendar
                      value={
                        data_ordem_inicio
                          ? moment(data_ordem_inicio).format("DD/MM/YYYY")
                          : null
                      }
                      onChange={e => {
                        alteraDataOrdemInicio(e.value);
                        let dataEncerramento = calculaDataEncerramento(
                          data_assinatura,
                          e.value,
                          referencia_encerramento,
                          vigencia,
                          unidade_vigencia,
                        );
                        setContrato({
                          ...contrato,
                          dataEncerramento: dataEncerramento,
                        });
                      }}
                      keepInvalid={true}
                      showIcon={true}
                      locale="pt"
                      dateFormat="dd/mm/yy"
                      disabled={modoVisualizacao}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} xs={12} md={12} lg={6} xl={6}>
                    <FormGroup>
                      <Label>Referência para cálculo do encerramento</Label>
                      <Dropdown
                        options={referenciaEncerramentoOptions}
                        value={state.referencia_encerramento}
                        defaultValue={state.referencia_encerramento}
                        onChange={e => {
                          alteraReferenciaEncerramento(e.target.value);
                          let dataEncerramento = calculaDataEncerramento(
                            data_assinatura,
                            data_ordem_inicio,
                            e.target.value,
                            vigencia,
                            unidade_vigencia,
                          );
                          setContrato({
                            ...contrato,
                            dataEncerramento: dataEncerramento,
                          });
                        }}
                        disabled={modoVisualizacao}
                        className="w-100"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} xs={12} md={12} lg={6} xl={6}>
                    <div className="row">
                      <div className="input-group vigencia-contrato">
                        <div className="col-6">
                          <Label>Período de Vigência do Contrato</Label>
                          <InputText
                            value={nullToUndef(vigencia)}
                            placeholder="Ex: 365 dias"
                            onChange={e => {
                              alteraDiasVigencia(e.target.value);
                              let dataEncerramento = calculaDataEncerramento(
                                data_assinatura,
                                data_ordem_inicio,
                                referencia_encerramento,
                                e.target.value,
                                unidade_vigencia,
                              );
                              setContrato({
                                ...contrato,
                                dataEncerramento: dataEncerramento,
                              });
                            }}
                            name="vigencia"
                            required
                            type="text"
                            disabled={modoVisualizacao}
                          />
                        </div>
                        <div className="input-group-append mt-auto col-6">
                          <Input
                            type="select"
                            value={unidade_vigencia}
                            onChange={event => {
                              setContrato({
                                ...contrato,
                                unidade_vigencia: event.target.value,
                              });
                              let dataEncerramento = calculaDataEncerramento(
                                data_assinatura,
                                data_ordem_inicio,
                                referencia_encerramento,
                                vigencia,
                                event.target.value,
                              );
                              setContrato({
                                ...contrato,
                                dataEncerramento: dataEncerramento,
                              });
                            }}
                            name="unidade_vigencia"
                            disabled={modoVisualizacao}
                          >
                            <option value="DIAS">Dias</option>
                            <option value="MESES">Meses</option>
                          </Input>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col sm={12} xs={12} md={12} lg={6} xl={6}>
                    <FormGroup>
                      <Label>Data de Encerramento do Contrato</Label>
                      <Input value={dataEncerramento || ""} disabled={true} />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} xs={12} lg={3} xl={3}>
                <Row>
                  <Col>
                    <Label for="dataAssinatura">Contagem Vencimento</Label>
                    <br />
                    <Card className="text-center p-5">
                      <h2
                        style={{
                          color: corDoPrazo(contrato.dias_para_o_encerramento),
                        }}
                        className="font-weight-bold"
                      >
                        {contrato.dias_para_o_encerramento} dias
                      </h2>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CoadAccordion>

          <AccordionEmpresaContratada
            atualizaEmpresa={e => setEmpresa(e)}
            empresaContratada={empresa}
            disabilitado={modoVisualizacao}
            aberto={false}
          />

          <CoadAccordion titulo={"Orçamento e Finanças"}>
            <DotacoesOrcamentarias
              dotacoes={dotacoes}
              setDotacoes={dotacoes_orcamentarias =>
                setDotacoes(dotacoes_orcamentarias)
              }
              valorTotal={valorTotal}
              setValorTotal={valor_total => setValorTotal(valor_total)}
              disabled={modoVisualizacao}
            />
          </CoadAccordion>
          <CoadAccordion titulo="Objeto">
            {contrato.edital ? (
              <FormGroup>
                <div className="p-grid">
                  <div className="p-col-6">
                    <Label className="font-weight-bold">
                      Categoria de objeto
                    </Label>
                    <SelecionaTipoServico
                      className="w-100"
                      tipoServico={objeto_edital}
                      onSelect={e => setState({ ...state, objeto_edital: e })}
                      disabled={true}
                      ref={tipoServicoRef}
                    />
                  </div>
                  <div className="p-col-6 mt-4">
                    <AntButton
                      className="mt-2 font-weight-bold"
                      disabled={true}
                      type="link"
                      size="small"
                    >
                      + Cadastrar novo
                    </AntButton>
                  </div>
                  <div className="p-col-12">
                    <Label className="font-weight-bold">
                      Descrição do objeto do edital
                    </Label>
                    <Editor
                      style={{ height: "120px" }}
                      value={descricao_objeto_edital}
                      headerTemplate={<EditorHeader />}
                      readOnly={!modoVisualizacao}
                    />
                  </div>
                </div>
              </FormGroup>
            ) : (
              <FormGroup>
                <div className="p-grid">
                  <div className="p-col-6">
                    <Label className="font-weight-bold">
                      Categoria de objeto
                    </Label>
                    <SelecionaTipoServico
                      className="w-100"
                      tipoServico={tipo_servico}
                      onSelect={value =>
                        setState({
                          ...state,
                          tipo_servico: value,
                          tipo_servico_uuid: value.uuid,
                          tipoServico: value.nome,
                        })
                      }
                      ref={tipoServicoRef}
                      disabled={modoVisualizacao}
                    />
                  </div>
                  <div className="p-col-6 mt-4">
                    <AntButton
                      className="mt-2 font-weight-bold"
                      disabled={modoVisualizacao}
                      type="link"
                      size="small"
                      onClick={() =>
                        setState({ ...state, modalCadastrarObjeto: true })
                      }
                    >
                      + Cadastrar novo
                    </AntButton>
                  </div>
                  <div className="p-col-12">
                    <Label className="font-weight-bold">
                      Descreva brevemente o objeto do contrato
                    </Label>
                    <Editor
                      style={{ height: "120px" }}
                      value={descricao_objeto_contrato}
                      readOnly={!modoVisualizacao}
                      onTextChange={value =>
                        setState({
                          ...state,
                          objeto: value.htmlValue,
                          descricao_objeto_contrato: value.htmlValue,
                        })
                      }
                      headerTemplate={<EditorHeader />}
                    />
                  </div>
                </div>
              </FormGroup>
            )}
          </CoadAccordion>
          <CoadAccordion titulo={"Gestão de Contrato"}>
            <Row>
              <Col lg={12} xl={12}>
                <FormGroup>
                  <Label form="coordenador">Coordenador COAD</Label>
                  <Input
                    type="select"
                    disabled={modoVisualizacao}
                    onChange={e =>
                      setGestao({ ...gestao, coordenador: e.target.value })
                    }
                    value={coordenador || ""}
                  >
                    {usuarios
                      ? usuarios.map((usuario, i) => {
                          return (
                            <option key={i} value={usuario.uuid}>
                              {usuario.nome}
                            </option>
                          );
                        })
                      : ""}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                <FormGroup className="p-grid p-fluid pt-2 ml-1">
                  <Label form="gestor">Gestor do Contrato</Label>
                  <br />
                  <BuscaIncrementalServidores
                    placeholder={"Selecione o gestor do contrato"}
                    onUpdate={valor => setGestao({ ...gestao, gestor: valor })}
                    disabled={modoVisualizacao}
                    userName={usernameGestor}
                    onClear={() => {}}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <SelecionarNucleos
                  selected={nucleo_responsavel}
                  onSelect={value =>
                    setGestao({ ...gestao, nucleo_responsavel: value })
                  }
                  disabled={modoVisualizacao}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                <FormGroup>
                  <Label form="email-gestor">E-mail Gestor do Contrato</Label>
                  <InputText
                    id="email-gestor"
                    value={gestor ? gestor.email : ""}
                    disabled={true}
                    className="w-100"
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <FormGroup>
                  <Label form="telefone-gestor">
                    Telefone Gestor do Contrato
                  </Label>
                  <InputText
                    id="telefone-gestor"
                    value={"(11) 98888-7777"} // TODO: Confirmar se essa informacao deve estar hardcoded.
                    className="w-100"
                    disabled={true}
                  />
                </FormGroup>
              </Col>
            </Row>
          </CoadAccordion>
          {contrato.lotes && (
            <CoadAccordion titulo={"Unidade Envolvidas"}>
              <UnidadesEnvolvidas
                contrato={contrato}
                disabilitado={modoVisualizacao}
                setUnidadesSelecionadas={() => {}}
              />
            </CoadAccordion>
          )}
          <CoadAccordion titulo={"Anexos"}>
            <Anexos
              disabilitado={modoVisualizacao}
              selecionarDocsDre={selecionarDocsDre}
              docsDreSelecionados={docsDre}
              contrato={contrato}
            />
          </CoadAccordion>
          <CoadAccordion titulo={"Observações"}>
            <Editor
              style={{ height: "320px" }}
              value={observacoes}
              // readOnly={modoVisualizacao}
              onTextChange={e =>
                setState({ ...state, observacoes: e.htmlValue })
              }
              headerTemplate={
                <span className="ql-formats">
                  <button className="ql-bold" aria-label="Bold"></button>
                  <button className="ql-italic" aria-label="Italic"></button>
                  <button
                    className="ql-underline"
                    aria-label="Underline"
                  ></button>
                  <button className="ql-list" value="ordered"></button>
                  <button className="ql-list" value="bullet"></button>
                </span>
              }
            />
          </CoadAccordion>
          <Row className="mt-3">
            <Col lg={6}>
              <Button
                className="btn btn-coad-background-outline"
                disabled={true}
              >
                <i className="fas fa-history" /> Histórico
              </Button>
            </Col>
            <Col lg={6} className="d-flex flex-row-reverse">
              <Button
                className="btn btn-coad-background-outline"
                onClick={() =>
                  incluir ? handleConfimarCriacao() : handleConfimarEdicao()
                }
                disabled={modoVisualizacao || !habilitaBotao}
              >
                Salvar
              </Button>
              <Button
                onClick={() => redirect("#/gestao-contratos")}
                className="btn-coad-blue mx-2"
              >
                <i className="fas fa-arrow-left" /> Voltar
              </Button>
            </Col>
          </Row>
        </Container>
      </Page>
    </>
  );
};

export default VisualizarContratos;
