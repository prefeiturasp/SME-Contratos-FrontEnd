import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import CardSuperior from "./CardSuperior";
import { Messages } from "primereact/messages";
import CoadAccordion from "../../components/Global/CoadAccordion";
import {
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Card,
  Input,
  Alert,
} from "reactstrap";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import UnidadeEnvolvidas from "./UnidadesEnvolvidas";
import Anexos from "./Anexos";
import {
  getContratoByUUID,
  updateContrato
} from "../../service/Contratos.service";
import { getUrlParams } from "../../utils/params";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import {
  CALENDAR_PT,
  REFERENCIA_ENCERRAMENTO,
} from "../../configs/config.constants";
import SituacaoRadio from "../../components/Contratos/SelecionaSituacaoContrato/SituacaoRadio";
import EstadoRadio from "../../components/Contratos/SelecionaEstadoContrato/EstadoRadio";
import { SelecionaEmpresa } from "../../components/Contratos/SelecionaEmpresa";
import SelecionarNucleos from "../../components/Contratos/SelecionarNucleos";
import { BuscaIncrementalServidores } from "../../components/Contratos/BuscaIncrementalServidores";
import { redirect } from "../../utils/redirect";
import { getTiposServicoLookup } from "../../service/TiposServico.service";
import { mapStateToPayload, getUnidadesSelecionadas } from "./helpers";
import { Dialog } from "primereact/dialog";
import { getUsuariosLookup } from "../../service/Usuarios.service";
import ListarObrigacoesContratuais from "../../components/Contratos/ListarObrigacoesContratuais";
import DotacaoOrcamentaria from "../CadastrarContrato/DotacaoOrcamentaria";
import { Switch } from "antd";
import $ from "jquery";
import moment from "moment";
import { OK } from "http-status-codes";
import { TabelaUnidades } from "../CadastrarContrato/UnidadesEnvolvidas/TabelaUnidades";
import { UnidadesEnvolvidas } from "../CadastrarContrato/UnidadesEnvolvidas";

const nullToUndef = (v) => (v === null ? undefined : v);
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
      tipoServicoOptions: [],
      data_ordem_inicio: null,
      data_assinatura: null,
      situacao: null,
      empresa_contratada: {},
      objeto: "",
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
      vigencia_em_dias: null,
      numero_edital: null,
      dotacoes_orcamentarias: [],
      visible: false,
      usernameGestor: null,
      alert: false,
      usuarios: [],
      totalMensal: 0.0,
      dataEncerramento: null,
      referencia_encerramento: DATA_ORDEM_INICIO,
      unidades_selecionadas: [],
      valor_total: "",
      erro: "",
    };
    this.dotacoesRef = React.createRef();
  }

  setUnidadesSelecionadas = (unidades_selecionadas) => {
    this.setState({ unidades_selecionadas });
  };

  async componentDidMount() {
    const param = getUrlParams();
    const tiposServicos = await getTiposServicoLookup();
    const contrato = await getContratoByUUID(param.uuid);
    const usuarios = await getUsuariosLookup();
    this.setState({
      contrato,
      tipoServicoOptions: tiposServicos,
      coordenador: contrato.coordenador,
      usernameGestor: contrato.gestor ? contrato.gestor.username : "",
      usuarios,
      gestor: contrato.gestor,
      dataEncerramento: contrato.data_encerramento
        ? moment(contrato.data_encerramento).format("DD/MM/YYYY")
        : null,
      referencia_encerramento: contrato.referencia_encerramento,
    });
    this.propsToState(contrato);
    $(".ql-editor").prop("contenteditable", "false");
  }

  propsToState = contrato => {
    const tipo_servico = contrato.tipo_servico || { nome: "", uuid: ""}
    const empresa_contratada = contrato.empresa_contratada || { nome: ""} 
    this.setState({
      tipoServico: tipo_servico.nome,
      tipoServicoSelecionado: tipo_servico,
      nomeEmpresa: empresa_contratada.nome,
      termo_contrato: contrato.termo_contrato,
      tipo_servico: tipo_servico,
      tipo_servico_uuid: tipo_servico.uuid,
      situacao: contrato.situacao,
      data_ordem_inicio: contrato.data_ordem_inicio
        ? new Date(contrato.data_ordem_inicio)
        : null,
      data_encerramento: contrato.data_encerramento
        ? new Date(contrato.data_encerramento)
        : null,
      data_assinatura: contrato.data_assinatura
        ? new Date(contrato.data_assinatura)
        : null,
      processo: contrato.processo,
      empresa_contratada: empresa_contratada,
      totalMensal: contrato.total_mensal,
      objeto: contrato.objeto,
      observacoes: contrato.observacoes,
      gestor: contrato.gestor ? contrato.gestor.uuid : "",
      nucleo: contrato.nucleo_responsavel
        ? contrato.nucleo_responsavel.uuid
        : "",
      estado: contrato.estado_contrato,
      vigencia_em_dias: contrato.vigencia_em_dias,
      dotacoes_orcamentarias: contrato.dotacoes_orcamentarias.map(el => ({ ...el, valor: parseFloat(el.valor)})),
      valor_total: parseFloat(contrato.valor_total)
    });
  };

  selecionaTipoServico = (value) => {
    this.setState({ tipo_servico_uuid: value.target.value });
  };

  selecionarDocsDre = (files) => {
    const docs = Array.from(files);
    this.setState({ documentoFiscaDre: docs });
  };

  alteraDiasVigencia = (dias) => {
    this.setState({ vigencia_em_dias: dias }, () =>
      this.recalculaEncerramento()
    );
  };

  alteraDataAssinatura = (data) => {
    const data_assinatura = moment(data).format("YYYY-MM-DD");
    this.setState({ data_assinatura }, () => this.recalculaEncerramento());
  };

  alteraDataOrdemInicio = (data) => {
    const data_ordem_inicio = moment(data).format("YYYY-MM-DD");
    this.setState({ data_ordem_inicio });
  };

  alteraReferenciaEncerramento = (referencia_encerramento) => {
    this.setState({ referencia_encerramento });
    // TODO: implementar recalculo da data de encerramento
  };

  recalculaEncerramento = () => {
    const dataRef = this.state.data_assinatura;
    const dias = this.state.vigencia_em_dias;
    if (dias && dias.length && dataRef) {
      const parsedDate = typeof dataRef === "string" ? moment(dataRef).format("YYYY-MM-DD") : dataRef;
      const data = moment(parsedDate).format("DD/MM/YYYY");
      const novaData = moment(data, "DD/MM/YYYY").add(dias, "days").calendar();
      this.setState({
        dataEncerramento: moment(novaData).format("DD/MM/YYYY"),
      });
    }
  };

  habilitarEdicao = () => {
    this.setState({ disabilitado: !this.state.disabilitado });
    $(".ql-editor").prop("contenteditable", this.state.disabilitado.toString());
  };

  handleSubmit = async () => {
    const { uuid } = this.state.contrato;
    const dotacoesState = this.dotacoesRef.current ? this.dotacoesRef.current.getState() : null
    const payload = mapStateToPayload(this.state, dotacoesState);
    this.setState({ disabilitado: true, alert: true });
    $(".ql-editor").prop("contenteditable", this.state.disabilitado.toString());
    const resultado = await updateContrato(payload, uuid);
    if (resultado.status === OK) {
      setTimeout(() => {
        this.setState({ alert: false });
      }, 10000);
      this.cancelaAtualizacao();
      window.scrollTo(0, 0);
    } else {
      alert("Ocorreu um erro, tente novamente!");
    }
  };

  handleConfimar = () => {
    if(this.dotacoesRef.current) {
      const erro = this.dotacoesRef.current.getError();
      if(erro.length) {
        window.scrollTo(0, 0);
        this.setState({ erro });
        return;
      }
    }
    this.setState({ visible: true });
  };

  cancelaAtualizacao = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      contrato,
      tipoServico,
      nomeEmpresa,
      termo_contrato,
      situacao,
      processo,
      data_ordem_inicio,
      data_assinatura,
      empresa_contratada,
      objeto,
      observacoes,
      gestor,
      nucleo,
      estado,
      disabilitado,
      tipoServicoOptions,
      coordenador,
      documentoFiscaDre,
      vigencia_em_dias,
      numero_edital,
      visible,
      alert,
      usernameGestor,
      usuarios,
      dotacoes_orcamentarias,
      dataEncerramento,
      valor_total,
      erro
    } = this.state;
    console.log(contrato);
    return (
      <>
        <Page
          titulo={`Termo de Contrato n. ${contrato.termo_contrato} - ${nomeEmpresa}`}
        >
          <Messages ref={(el) => (this.messages = el)}></Messages>
          <Alert
            color="success"
            className="text-center font-weight-bold"
            isOpen={alert}
            toggle={() => this.setState({ alert: false })}
          >
            Alterações realizadas com sucesso
          </Alert>
          <Alert
            color="danger"
            className="text-center font-weight-bold"
            isOpen={!!erro.length}
            toggle={() => this.setState({ erro: "" })}
          > { erro } </Alert>
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
              visible={visible}
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
                    onClick={this.handleSubmit}
                  >
                    Sim
                  </button>
                </div>
              }
            >
              Foram feitas alterações em contrato. Deseja aplicá-las em
              documento?
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
                  onClick={() => this.handleConfimar()}
                  disabled={disabilitado}
                >
                  Salvar
                </Button>
                <Button
                  onClick={() => redirect("#/contratos-continuos")}
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
            </Row>
            <CoadAccordion titulo={"Informações Contrato"}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <FormGroup>
                    <Label form="termoContrato">Número Termo de Contrato</Label>
                    <InputText
                      id="termoContrato"
                      value={termo_contrato || ""}
                      onChange={(e) =>
                        this.setState({ termo_contrato: e.target.value })
                      }
                      placeholder={"Ex: 001/002"}
                      className="w-100"
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                  <FormGroup>
                    <Label for="tipo_servico">Selecionar Tipo Serviço</Label>
                    <Input
                      id="tipo_servico"
                      type="select"
                      onChange={(e) => this.selecionaTipoServico(e)}
                      disabled={disabilitado}
                      defaultValue={tipoServico}
                    >
                      {tipoServicoOptions.map((value) => {
                        return (
                          <option key={value.uuid} value={value.uuid}>
                            {value.nome}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <FormGroup>
                    <Label form="numeroProcesso">Número de Processo</Label>
                    <InputText
                      id="numeroProcesso"
                      value={nullToUndef(processo)}
                      onChange={(e) =>
                        this.setState({ processo: e.target.value })
                      }
                      placeholder={"Ex: 0000.2019/0000000-0"}
                      className="w-100"
                      disabled={disabilitado}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                  <Label form="situacao">Situação de Contrato</Label>
                  <br />
                  <SituacaoRadio
                    checado={situacao}
                    onSelect={(value) => this.setState({ situacao: value })}
                    disabled={disabilitado}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Label for="edital">Número do Edital</Label>
                  <InputText
                    disabled={true}
                    id="edital"
                    value={nullToUndef(numero_edital)}
                    placeholder={"Ex: 00000000"}
                    className="w-100"
                    onChange={(e) =>
                      this.setState({ numero_edital: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                  <Label form="estado">Estado de Contrato</Label>
                  <br />
                  <EstadoRadio
                    onSelect={(value) => this.setState({ estado: value })}
                    checado={estado}
                    disabled={disabilitado}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12} xs={12} lg={9} xl={9}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3">
                      <Label>Data Assinatura de Contrato</Label>
                      <br />

                      <Calendar
                        value={
                          data_assinatura ? new Date(data_assinatura) : null
                        }
                        onChange={(e) => this.alteraDataAssinatura(e.value)}
                        locale={CALENDAR_PT}
                        dateFormat="dd/mm/yy"
                        showIcon={true}
                        disabled={disabilitado}
                        id="data_assinatura"
                      />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3">
                      <Label>Data Ordem de Início</Label>
                      <br />
                      <Calendar
                        value={data_ordem_inicio}
                        onChange={(e) => this.alteraDataOrdemInicio(e.value)}
                        showIcon={true}
                        locale={CALENDAR_PT}
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
                          onChange={(e) =>
                            this.alteraReferenciaEncerramento(e.target.value)
                          }
                          disabled={disabilitado}
                          className="w-100"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} xs={12} md={12} lg={6} xl={6}>
                      <FormGroup>
                        <Label for="vigencia">Vigência de Contrato</Label>
                        <InputText
                          id="vigencia"
                          value={nullToUndef(vigencia_em_dias)}
                          onChange={(e) =>
                            this.alteraDiasVigencia(e.target.value)
                          }
                          placeholder={"Ex: 365 dias"}
                          className="w-100"
                          disabled={disabilitado}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} xs={12} md={12} lg={6} xl={6}>
                      <FormGroup>
                        <Label>Data Encerramento de Contrato</Label>
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
                        <h2 className="font-weight-bold text-success">
                          {contrato.dias_para_o_encerramento} dias
                        </h2>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CoadAccordion>
            <CoadAccordion titulo={"Empresa Contratada"}>
              <Row>
                <Col lg={6} xl={6} sx={12} md={12} sm={12}>
                  <Row>
                    <Col style={{ paddingTop: "0.4rem" }}>
                      <FormGroup className="p-grid p-fluid">
                        <Label>Nome Empresa</Label>
                        <br />
                        <SelecionaEmpresa
                          selecionada={empresa_contratada}
                          onSelect={(value) =>
                            this.setState({ empresa_contratada: value })
                          }
                          disabled={disabilitado}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} xl={6} sx={12} md={6} sm={6}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>CNPJ Empresa</Label>
                        <InputText
                          value={
                            empresa_contratada ? empresa_contratada.cnpj : ""
                          }
                          placeholder={"Digite nome da empresa"}
                          className="w-100 pb-2"
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CoadAccordion>
            <CoadAccordion titulo={"Informações Orçamentárias de Contrato"}>
            <DotacaoOrcamentaria
              ref={this.dotacoesRef}
              dotacoesSalvas={dotacoes_orcamentarias}
              valorTotalSalvo={valor_total}
              disabled={disabilitado}
              />
                        </CoadAccordion>*/}
            <CoadAccordion titulo={"Objeto de Contrato"}>
              <Editor
                style={{ height: "320px" }}
                value={objeto}
                // readOnly={disabilitado}
                onTextChange={(e) => this.setState({ objeto: e.htmlValue })}
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
            <CoadAccordion titulo={"Obrigações Contratuais"}>
              <ListarObrigacoesContratuais
                contrato={contrato.uuid}
                desabilitado={disabilitado}
              />
            </CoadAccordion>
            <CoadAccordion titulo={"Gestão de Contrato"}>
              <Row>
                <Col lg={12} xl={12}>
                  <FormGroup>
                    <Label form="coordenador">Coordenador COAD</Label>
                    <Input
                      type="select"
                      disabled={disabilitado}
                      onChange={(e) =>
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
                      onUpdate={(valor) => this.setState({ gestor: valor })}
                      disabled={disabilitado}
                      userName={usernameGestor}
                      onClear={() => {}}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <SelecionarNucleos
                    selected={nucleo}
                    onSelect={(value) =>
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
            <CoadAccordion titulo={"Observações"}>
              <Editor
                style={{ height: "320px" }}
                value={observacoes}
                // readOnly={disabilitado}
                onTextChange={(e) =>
                  this.setState({ observacoes: e.htmlValue })
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
                  onClick={() => this.handleConfimar()}
                  disabled={disabilitado}
                >
                  Salvar
                </Button>
                <Button
                  onClick={() => redirect("#/contratos-continuos")}
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
