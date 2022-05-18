import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import CardSuperior from "./CardSuperior";
import { Toast } from "primereact/toast";
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
import DotacaoOrcamentaria from "../CadastrarContrato/DotacaoOrcamentaria";
import { Button as AntButton, Switch } from "antd";
import $ from "jquery";
import moment from "moment";
import { criaTipoServico } from "../../service/TiposServico.service";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { UnidadesEnvolvidas } from "../CadastrarContrato/UnidadesEnvolvidas";
import { SelecionaEdital } from "../../components/Contratos/SelecionaEditalContrato";
import { AccordionEmpresaContratada } from "../../components/Contratos/AccordionEmpresaContratada";
import SelecionaAta from "../../components/Contratos/SelecionaAta";

const nullToUndef = v => (v === null ? undefined : v);
const { DATA_ASSINATURA, DATA_ORDEM_INICIO } = REFERENCIA_ENCERRAMENTO;

const referenciaEncerramentoOptions = [
  { label: "Data da assinatura", value: DATA_ASSINATURA },
  { label: "Data da ordem de início", value: DATA_ORDEM_INICIO },
];

class VisualizarContratos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordenador: null,
      contrato: {},
      termo_contrato: null,
      tipo_servico: null,
      tipoServicoSelecionado: null,
      data_ordem_inicio: null,
      data_assinatura: null,
      situacao: null,
      empresa_contratada: {},
      observacoes: "",
      situacaoContrato: [],
      gestor: null,
      nucleo: null,
      estado: null,
      unidades: [],
      tipoServico: null,
      nomeEmpresa: null,
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
      incluir: true,
    };
    this.dotacoesRef = React.createRef();
    this.toast = React.createRef();
    this.tipoServico = React.createRef();
    addLocale("pt", CALENDAR_PT);
  }

  setUnidadesSelecionadas = unidades_selecionadas => {
    this.setState({ unidades_selecionadas });
  };

  setEdital = e => {
    this.setState({ alteracaoEdital: e.value });
  };

  async componentDidMount() {
    const param = getUrlParams();

    const usuarios = await getUsuariosLookup();
    if (param.uuid) {
      const contrato = await getContratoByUUID(param.uuid);
      this.setState({
        contrato,
        coordenador: contrato.coordenador,
        usernameGestor: contrato.gestor ? contrato.gestor.username : "",
        usuarios,
        gestor: contrato.gestor,
        dataEncerramento: contrato.data_encerramento
          ? moment(contrato.data_encerramento).format("DD/MM/YYYY")
          : null,
        referencia_encerramento: contrato.referencia_encerramento,
        incluir: false,
      });
      this.propsToState(contrato);
      $(".ql-editor").prop("contenteditable", "false");
    } else {
      this.setState({
        usuarios,
        disabilitado: false,
      });
    }
  }

  propsToState = contrato => {
    const tipo_servico = contrato.edital
      ? contrato.edital.objeto
      : contrato.tipo_servico || { nome: "", uuid: "" };
    const empresa_contratada = contrato.empresa_contratada || { nome: "" };
    this.setState({
      tipoServico: tipo_servico.nome,
      tipoServicoSelecionado: tipo_servico,
      nomeEmpresa: empresa_contratada.nome,
      termo_contrato: contrato.termo_contrato,
      tipo_servico: tipo_servico,
      tipo_servico_uuid: tipo_servico.uuid,
      situacao: contrato.situacao,
      data_ordem_inicio: contrato.data_ordem_inicio
        ? moment(contrato.data_ordem_inicio, "YYYY-MM-DD")
        : null,
      data_encerramento: contrato.data_encerramento
        ? new Date(contrato.data_encerramento)
        : null,
      data_assinatura: contrato.data_assinatura
        ? moment(contrato.data_assinatura, "YYYY-MM-DD").format("DD/MM/YYYY")
        : null,
      processo: contrato.processo,
      empresa_contratada: empresa_contratada,
      totalMensal: contrato.total_mensal,
      observacoes: contrato.observacoes,
      gestor: contrato.gestor ? contrato.gestor.uuid : "",
      nucleo: contrato.nucleo_responsavel
        ? contrato.nucleo_responsavel.uuid
        : "",
      estado: contrato.estado_contrato,
      vigencia: contrato.vigencia,
      dotacoes_orcamentarias: contrato.dotacoes_orcamentarias.map(el => ({
        ...el,
        valor: parseFloat(el.valor),
      })),
      valor_total: parseFloat(contrato.valor_total),
      unidade_vigencia: contrato.unidade_vigencia,
      edital: contrato.edital,
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
      ata: contrato.ata,
    });
  };
  selecionaTipoServico = value => {
    this.setState({ tipo_servico_uuid: value.target.value });
  };

  selecionarDocsDre = files => {
    const docs = Array.from(files);
    this.setState({ documentoFiscaDre: docs });
  };

  alteraDiasVigencia = dias => {
    this.setState({ vigencia: dias });
  };

  alteraDataAssinatura = data => {
    const data_assinatura = moment(data).format("YYYY-MM-DD");
    this.setState({ data_assinatura });
  };

  alteraDataOrdemInicio = data => {
    const data_ordem_inicio = moment(data).format("YYYY-MM-DD");
    this.setState({ data_ordem_inicio });
  };

  alteraReferenciaEncerramento = referencia_encerramento => {
    this.setState({ referencia_encerramento });
  };

  habilitarEdicao = () => {
    this.setState({ disabilitado: !this.state.disabilitado });
    this.state.contrato.edital
      ? $(".ql-editor").prop(
          "contenteditable",
          !this.state.disabilitado.toString(),
        )
      : $(".ql-editor").prop(
          "contenteditable",
          this.state.disabilitado.toString(),
        );
  };

  handleSubmitEditar = async () => {
    const { uuid } = this.state.contrato;
    const dotacoesState = this.dotacoesRef.current
      ? this.dotacoesRef.current.getState()
      : null;
    const payload = mapStateToPayload(
      this.state,
      dotacoesState,
      this.state.incluir,
    );
    this.setState({ disabilitado: true });
    this.setState({ modalEdicao: false });
    this.toast.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Alterações realizadas com sucesso",
      life: 7000,
    });
    $(".ql-editor").prop("contenteditable", this.state.disabilitado.toString());
    const resultado = await updateContrato(payload, uuid);
    if (resultado.status === OK) {
      this.setState({
        dataEncerramento: moment(resultado.data.data_encerramento).format(
          "DD/MM/YYYY",
        ),
        contrato: {
          ...this.state.contrato,
          dias_para_o_encerramento: resultado.data.dias_para_o_encerramento,
          edital:
            typeof resultado.data.edital === "object"
              ? resultado.data.edital
              : this.state.contrato.edital,
        },
      });
      this.cancelaAtualizacao();
      window.scrollTo(0, 0);
    } else {
      alert("Ocorreu um erro, tente novamente!");
    }
  };

  handleSubmitCadastro = async () => {
    const { uuid } = this.state.contrato;
    const dotacoesState = this.dotacoesRef.current
      ? this.dotacoesRef.current.getState()
      : null;
    const payload = mapStateToPayload(
      this.state,
      dotacoesState,
      this.state.incluir,
    );

    const resultado = await createContrato(payload, uuid);
    if (resultado.uuid) {
      this.toast.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Contrato criado com sucesso",
        life: 7000,
      });
      redirect("/#/gestao-contratos");
    } else {
      this.toast.show({
        severity: "error",
        detail: "Ocorreu um erro, tente novamente!",
        life: 7000,
      });
    }
  };

  handleConfimarEdicao = () => {
    if (this.dotacoesRef.current) {
      const erro = this.dotacoesRef.current.getError();
      if (erro.length) {
        this.toast.show({
          severity: "error",
          summary: "Erro",
          detail: erro,
          life: 7000,
        });
      }
    }
    this.setState({ modalEdicao: true });
  };

  handleConfimarCriacao = () => {
    if (this.dotacoesRef.current) {
      const erro = this.dotacoesRef.current.getError();
      if (erro.length) {
        this.toast.show({
          severity: "error",
          summary: "Erro",
          detail: erro,
          life: 7000,
        });
      }
    }
    this.setState({ modalCadastro: true });
  };

  cancelaAtualizacao = () => {
    this.setState({ modalEdicao: false });
  };

  cancelaCadastro = () => {
    this.setState({ modalCadastro: false });
  };

  cancelaModalObjeto = () => {
    this.setState({ modalCadastrarObjeto: false });
  };

  CadastraObjeto = async () => {
    this.setState({ modalCadastrarObjeto: false });
    try {
      const resultado = await criaTipoServico({ nome: this.state.novoObjeto });
      if (resultado.status === CREATED) {
        this.tipoServico.current.buscaTiposServico();
        this.toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Objeto cadastrado com sucesso!",
          life: 7000,
        });
      }
    } catch (erro) {
      if (erro.response && erro.response.status === BAD_REQUEST) {
        this.toast.show({
          severity: "error",
          summary: "Erro",
          detail: erro.response.data,
          life: 7000,
        });
      }
    }
    this.setState({ novoObjeto: "" });
  };
  atualizaEmpresa(value) {
    this.setState({
      empresa_contratada: value,
    });
  }

  calculaDataEncerramento = (
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
      this.setState({ dataEncerramento: "" });
      return false;
    }
    if (unidade === "DIAS") {
      let data_encerramento = dataInicio.add("days", vigencia);
      let vencimento = data_encerramento.diff(moment(), "days");
      this.setState({
        contrato: {
          ...this.state.contrato,
          dias_para_o_encerramento: vencimento,
        },
      });
      return data_encerramento.format("DD/MM/yyyy");
    } else {
      let data_encerramento = dataInicio
        .add("months", vigencia)
        .subtract(1, "days");
      let vencimento = data_encerramento.diff(moment(), "days");
      this.setState({
        contrato: {
          ...this.state.contrato,
          dias_para_o_encerramento: vencimento,
        },
      });
      return data_encerramento.format("DD/MM/yyyy");
    }
  };

  render() {
    const {
      contrato,
      tipoServico,
      tipo_servico,
      nomeEmpresa,
      termo_contrato,
      situacao,
      processo,
      data_ordem_inicio,
      data_assinatura,
      empresa_contratada,
      observacoes,
      gestor,
      nucleo,
      estado,
      disabilitado,
      coordenador,
      documentoFiscaDre,
      vigencia,
      modalEdicao,
      modalCadastro,
      usernameGestor,
      usuarios,
      dotacoes_orcamentarias,
      dataEncerramento,
      valor_total,
      unidade_vigencia,
      edital,
      objeto_edital,
      descricao_objeto_edital,
      descricao_objeto_contrato,
      modalCadastrarObjeto,
      novoObjeto,
      incluir,
      referencia_encerramento,
      ata,
    } = this.state;
    const habilitaBotao =
      termo_contrato &&
      processo &&
      situacao &&
      data_assinatura &&
      data_ordem_inicio &&
      referencia_encerramento &&
      vigencia &&
      dataEncerramento;

    return (
      <>
        <Page
          titulo={
            contrato.termo_contrato
              ? `Termo de Contrato n. ${contrato.termo_contrato} - ${
                  nomeEmpresa ? nomeEmpresa : ""
                }`
              : "Novo Termo de Contrato"
          }
        >
          <Toast ref={el => (this.toast = el)}></Toast>
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
              onHide={() => this.cancelaAtualizacao()}
              footer={
                <div>
                  <button
                    className="btn btn-coad-background-outline"
                    onClick={() => this.cancelaAtualizacao()}
                  >
                    Não
                  </button>
                  <button
                    className="btn btn-coad-primary"
                    onClick={this.handleSubmitEditar}
                  >
                    Sim
                  </button>
                </div>
              }
            >
              Foram feitas alterações em contrato. Deseja aplicá-las em
              documento?
            </Dialog>

            <Dialog
              header="Aplicar alterações"
              visible={modalCadastro}
              style={{ width: "50vw" }}
              modal={true}
              onHide={() => this.cancelaCadastro()}
              footer={
                <div>
                  <button
                    className="btn btn-coad-background-outline"
                    onClick={() => this.cancelaCadastro()}
                  >
                    Não
                  </button>
                  <button
                    className="btn btn-coad-primary"
                    onClick={this.handleSubmitCadastro}
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
                    onClick={() => this.cancelaModalObjeto()}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={this.CadastraObjeto}
                    className="btn btn-coad-primary"
                    disabled={!novoObjeto.length}
                  >
                    Adicionar
                  </button>
                </div>
              }
              onHide={() => this.cancelaModalObjeto()}
            >
              <div>
                <label htmlFor="objeto">Nome do objeto</label>
                <br />
                <InputText
                  value={novoObjeto || ""}
                  onChange={e =>
                    this.setState({ novoObjeto: e.target.value.toUpperCase() })
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
                    incluir
                      ? this.handleConfimarCriacao()
                      : this.handleConfimarEdicao()
                  }
                  disabled={disabilitado || !habilitaBotao}
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
                      checked={!disabilitado}
                      defaultChecked={false}
                      onChange={() => this.habilitarEdicao()}
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
                        this.setState({ termo_contrato: e.target.value })
                      }
                      placeholder={"Ex: 001/002"}
                      className="w-100"
                      readOnly={disabilitado}
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
                        this.setState({ processo: e.target.value })
                      }
                      placeholder={"Ex: 0000.2019/0000000-0"}
                      className="w-100"
                      disabled={disabilitado}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Label form="situacao">Status</Label>
                  <br />
                  <SituacaoRadio
                    checado={situacao}
                    onSelect={value => this.setState({ situacao: value })}
                    disabled={disabilitado}
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
                    onSelect={value =>
                      this.setState({
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
                      })
                    }
                    disabled={disabilitado || (!incluir && !contrato.edital)}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <SelecionaAta
                    id="numeroAta"
                    className="w-100"
                    value={ata}
                    edital={edital}
                    onSelect={event => {
                      this.setState({
                        ata: event.value,
                      });
                    }}
                    disabled={disabilitado || !edital}
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
                          this.alteraDataAssinatura(e.value);
                          let dataEncerramento = this.calculaDataEncerramento(
                            e.value,
                            data_ordem_inicio,
                            referencia_encerramento,
                            vigencia,
                            unidade_vigencia,
                          );
                          this.setState({ dataEncerramento: dataEncerramento });
                        }}
                        keepInvalid={true}
                        locale="pt"
                        dateFormat="dd/mm/yy"
                        showIcon={true}
                        disabled={disabilitado}
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
                          this.alteraDataOrdemInicio(e.value);
                          let dataEncerramento = this.calculaDataEncerramento(
                            data_assinatura,
                            e.value,
                            referencia_encerramento,
                            vigencia,
                            unidade_vigencia,
                          );
                          this.setState({ dataEncerramento: dataEncerramento });
                        }}
                        keepInvalid={true}
                        showIcon={true}
                        locale="pt"
                        dateFormat="dd/mm/yy"
                        disabled={disabilitado}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} xs={12} md={12} lg={6} xl={6}>
                      <FormGroup>
                        <Label>Referência para cálculo do encerramento</Label>
                        <Dropdown
                          options={referenciaEncerramentoOptions}
                          value={this.state.referencia_encerramento}
                          defaultValue={this.state.referencia_encerramento}
                          onChange={e => {
                            this.alteraReferenciaEncerramento(e.target.value);
                            let dataEncerramento = this.calculaDataEncerramento(
                              data_assinatura,
                              data_ordem_inicio,
                              e.target.value,
                              vigencia,
                              unidade_vigencia,
                            );
                            this.setState({
                              dataEncerramento: dataEncerramento,
                            });
                          }}
                          disabled={disabilitado}
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
                                this.alteraDiasVigencia(e.target.value);
                                let dataEncerramento =
                                  this.calculaDataEncerramento(
                                    data_assinatura,
                                    data_ordem_inicio,
                                    referencia_encerramento,
                                    e.target.value,
                                    unidade_vigencia,
                                  );
                                this.setState({
                                  dataEncerramento: dataEncerramento,
                                });
                              }}
                              name="vigencia"
                              required
                              type="text"
                              disabled={disabilitado}
                            />
                          </div>
                          <div className="input-group-append mt-auto col-6">
                            <Input
                              type="select"
                              value={unidade_vigencia}
                              onChange={event => {
                                this.setState({
                                  unidade_vigencia: event.target.value,
                                });
                                let dataEncerramento =
                                  this.calculaDataEncerramento(
                                    data_assinatura,
                                    data_ordem_inicio,
                                    referencia_encerramento,
                                    vigencia,
                                    event.target.value,
                                  );
                                this.setState({
                                  dataEncerramento: dataEncerramento,
                                });
                              }}
                              name="unidade_vigencia"
                              disabled={disabilitado}
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
                            color: corDoPrazo(
                              contrato.dias_para_o_encerramento,
                            ),
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
              atualizaEmpresa={e =>
                this.setState({
                  empresa_contratada: e,
                  nomeEmpresa: e.nome,
                })
              }
              empresaContratada={empresa_contratada}
              disabilitado={disabilitado}
              aberto={false}
            />

            <CoadAccordion titulo={"Informações Orçamentárias de Contrato"}>
              <DotacaoOrcamentaria
                ref={this.dotacoesRef}
                dotacoesSalvas={dotacoes_orcamentarias}
                valorTotalSalvo={valor_total}
                disabled={disabilitado}
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
                        onSelect={e => this.setState({ objeto_edital: e })}
                        disabled={true}
                        ref={this.tipoServico}
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
                        readOnly={!disabilitado}
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
                          this.setState({
                            tipo_servico: value,
                            tipo_servico_uuid: value.uuid,
                            tipoServico: value.nome,
                          })
                        }
                        ref={this.tipoServico}
                        disabled={disabilitado}
                      />
                    </div>
                    <div className="p-col-6 mt-4">
                      <AntButton
                        className="mt-2 font-weight-bold"
                        disabled={disabilitado}
                        type="link"
                        size="small"
                        onClick={() =>
                          this.setState({ modalCadastrarObjeto: true })
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
                        readOnly={!disabilitado}
                        onTextChange={value =>
                          this.setState({
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
                      disabled={disabilitado}
                      onChange={e =>
                        this.setState({ coordenador: e.target.value })
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
                      onUpdate={valor => this.setState({ gestor: valor })}
                      disabled={disabilitado}
                      userName={usernameGestor}
                      onClear={() => {}}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <SelecionarNucleos
                    selected={nucleo}
                    onSelect={value =>
                      this.setState({ nucleo_responsavel: value })
                    }
                    disabled={disabilitado}
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
                  disabilitado={disabilitado}
                  setUnidadesSelecionadas={this.setUnidadesSelecionadas}
                  messages={this.messages}
                />
              </CoadAccordion>
            )}
            <CoadAccordion titulo={"Anexos"}>
              <Anexos
                disabilitado={disabilitado}
                selecionarDocsDre={this.selecionarDocsDre}
                docsDreSelecionados={documentoFiscaDre}
                contrato={contrato}
              />
            </CoadAccordion>
            <CoadAccordion titulo={"Observações"}>
              <Editor
                style={{ height: "320px" }}
                value={observacoes}
                // readOnly={disabilitado}
                onTextChange={e => this.setState({ observacoes: e.htmlValue })}
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
                    incluir
                      ? this.handleConfimarCriacao()
                      : this.handleConfimarEdicao()
                  }
                  disabled={disabilitado || !habilitaBotao}
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
  }
}

export default VisualizarContratos;
