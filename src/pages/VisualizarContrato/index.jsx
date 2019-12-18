import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import CardSuperior from "./CardSuperior";
import CoadAccordion from "../../components/Global/CoadAccordion";
import {
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Card,
  Input,
  Alert
} from "reactstrap";
import { Editor } from "primereact/editor";
import UnidadeEnvolvidas from "./UnidadesEnvolvidas";
import Anexos from "./Anexos";
import {
  getContratoByUUID,
  getEstadosContrato,
  updateContrato
} from "../../service/Contratos.service";
import { getUrlParams } from "../../utils/params";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { CALENDAR_PT } from "../../configs/config.constants";
import SituacaoRadio from "../../components/Contratos/SelecionaSituacaoContrato/SituacaoRadio";
import EstadoRadio from "../../components/Contratos/SelecionaEstadoContrato/EstadoRadio";
import { SelecionaEmpresa } from "../../components/Contratos/SelecionaEmpresa";
import SelecionarNucleos from "../../components/Contratos/SelecionarNucleos";
import { BuscaIncrementalServidores } from "../../components/Contratos/BuscaIncrementalServidores";
import { redirect } from "../../utils/redirect";
import { getTiposServicoLookup } from "../../service/TiposServico.service";
import { mapStateToPayload } from "./helpers";
import { Dialog } from "primereact/dialog";
import { getUsuariosLookup } from "../../service/Usuarios.service";
import ListarObrigacoesContratuais from "../../components/Contratos/ListarObrigacoesContratuais";
import DotacaoOrcamentaria from "../CadastrarContrato/DotacaoOrcamentaria";
import { Switch } from "antd";
import $ from "jquery";
import moment from "moment";

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
      estadoContrato: [],
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
      dotacao: [],
      visible: false,
      usernameGestor: null,
      alert: false,
      usuarios: [],
      totalMensal: 0.0,
      dataEncerramento: null
    };

    this.selecionaTipoServico = this.selecionaTipoServico.bind(this);
  }

  async componentDidMount() {
    const param = getUrlParams();
    const tiposServicos = await getTiposServicoLookup();
    const contrato = await getContratoByUUID(param.uuid);
    const estadoContrato = await getEstadosContrato();
    const usuarios = await getUsuariosLookup();
    this.setState({
      contrato,
      estadoContrato,
      tipoServicoOptions: tiposServicos,
      coordenador: contrato.coordenador,
      usernameGestor: contrato.gestor ? contrato.gestor.username : "",
      usuarios,
      gestor: contrato.gestor,
      dataEncerramento: contrato.data_encerramento
        ? moment(contrato.data_encerramento).format("DD/MM/YYYY")
        : null
    });
    this.propsToState(contrato);
  }

  propsToState = contrato => {
    this.setState({
      tipoServico: contrato.tipo_servico.nome,
      tipoServicoSelecionado: contrato.tipo_servico,
      nomeEmpresa: contrato.empresa_contratada.nome,
      termo_contrato: contrato.termo_contrato,
      tipo_servico: contrato.tipo_servico,
      tipo_servico_uuid: contrato.tipo_servico.uuid,
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
      empresa_contratada: contrato.empresa_contratada,
      totalMensal: contrato.total_mensal,
      objeto: contrato.objeto,
      observacoes: contrato.observacoes,
      gestor: contrato.gestor ? contrato.gestor.uuid : "",
      nucleo: contrato.nucleo_responsavel
        ? contrato.nucleo_responsavel.uuid
        : "",
      estado: contrato.estado_contrato,
      vigencia_em_dias: contrato.vigencia_em_dias,
      dotacao: contrato.dotacao_orcamentaria
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
    this.setState({ vigencia_em_dias: dias });

    this.calculaEncerramento(
      this.state.data_assinatura,
      this.state.vigencia_em_dias
    );
  };

  alteraDataAssinatura = data => {
    const data_assinatura = moment(data).format("YYYY-MM-DD");
    this.setState({ data_assinatura });
    this.calculaEncerramento(
      data_assinatura,
      this.state.vigencia_em_dias
    );
  };

  calculaEncerramento = (data, dias) => {
    if (data) {
      data = moment(data).format("DD/MM/YYYY");
      const novaData = moment(data, "DD/MM/YYYY")
        .add(dias, "days")
        .calendar();

      this.setState({
        dataEncerramento: moment(novaData).format("DD/MM/YYYY")
      });
    }
  };

  habilitarEdicao = () => {
    this.setState({ disabilitado: !this.state.disabilitado });
    $(".ql-editor").prop("contenteditable", this.state.disabilitado.toString());
  };

  handleSubmit = () => {
    const { uuid } = this.state.contrato;
    const payload = mapStateToPayload(this.state);
    this.setState({ disabilitado: true, alert: true });
    updateContrato(payload, uuid);
    setTimeout(() => {
      this.setState({ alert: false });
    }, 10000);
    this.cancelaAtualizacao();
    window.scrollTo(0, 0);
  };

  handleConfimar = () => {
    this.setState({ visible: true });
  };

  cancelaAtualizacao = () => {
    this.setState({ visible: false });
  };

  teste = () => {
    return this.state.disabilitado;
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
      totalMensal,
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
      dotacao,
      dataEncerramento
    } = this.state;
    return (
      <>
        <Page
          titulo={`Termo de Contrato n. ${contrato.termo_contrato} - ${nomeEmpresa}`}
        >
          <Alert
            color="success"
            className="text-center font-weight-bold"
            isOpen={alert}
            toggle={() => this.setState({ alert: false })}
          >
            Alterações realizadas com sucesso
          </Alert>
          <CardSuperior
            tipoServico={tipoServico}
            situacaoContratual={estado}
            estadoContrato={situacao}
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
                    Cancelar
                  </button>
                  <button
                    className="btn btn-coad-primary"
                    onClick={this.handleSubmit}
                  >
                    Aplicar
                  </button>
                </div>
              }
            >
              Foram feitas alterações no contrato. Deseja aplicar estas
              modificações no documento?
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
                      value={termo_contrato}
                      onChange={e =>
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
                      onChange={e => this.selecionaTipoServico(e)}
                      disabled={disabilitado}
                    >
                      {tipoServicoOptions.map(value => {
                        let selecionado =
                          tipoServico === value.nome ? true : false;
                        return (
                          <option selected={selecionado} value={value.uuid}>
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
                      value={processo}
                      onChange={e =>
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
                    onSelect={value => this.setState({ situacao: value })}
                    disabled={disabilitado}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Label for="edital">Número do Edital</Label>
                  <InputText
                    id="edital"
                    value={numero_edital}
                    placeholder={"Ex: 00000000"}
                    className="w-100"
                    disabled={disabilitado}
                    onChange={e =>
                      this.setState({ numero_edital: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                  <Label form="estado">Estado de Contrato</Label>
                  <br />
                  <EstadoRadio
                    onSelect={value => this.setState({ estado: value })}
                    checado={estado}
                    disabled={disabilitado}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12} xs={12} lg={8} xl={8}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                      <Label>Data Assinatura de Contrato</Label>
                      <br />

                      <Calendar
                        value={
                          data_assinatura ? new Date(data_assinatura) : null
                        }
                        onChange={e => this.alteraDataAssinatura(e.value)}
                        locale={CALENDAR_PT}
                        dateFormat="dd/mm/yy"
                        showIcon={true}
                        disabled={disabilitado}
                        id="data_assinatura"
                      />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                      <Label>Data Ordem de Início</Label>
                      <br />
                      <Calendar
                        value={data_ordem_inicio}
                        onChange={e =>
                          this.setState({ data_ordem_inicio: e.value })
                        }
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
                        <Label for="vigencia">Vigência de Contrato</Label>
                        <InputText
                          id="vigencia"
                          value={vigencia_em_dias}
                          onChange={e =>
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
                        <Input value={dataEncerramento} disabled={true} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} xs={12} lg={4} xl={4}>
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
                          onSelect={value =>
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
                          value={empresa_contratada.cnpj}
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
                dotacao={dotacao}
                getDotacao={value => this.setState({ dotacao: value })}
                disableded={disabilitado}
                setTotalMensal={value => this.setState({ totalMensal: value })}
                totalMensal={totalMensal}
              />
            </CoadAccordion>
            <CoadAccordion titulo={"Objeto de Contrato"}>
              <Editor
                style={{ height: "320px" }}
                value={objeto}
                readOnly={disabilitado}
                onTextChange={e => this.setState({ objeto: e.htmlValue })}
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
              <ListarObrigacoesContratuais contrato={contrato.uuid} />
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
                      value={coordenador}
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
                      onClear={true}
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
                      value={"(11) 98888-7777"}
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
                readOnly={disabilitado}
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
            <CoadAccordion titulo={"Unidade Envolvidas"}>
              <UnidadeEnvolvidas
                disabilitado={disabilitado}
                AdicionarUnidades={this.addUnidades}
                termo={contrato.termo_contrato}
                contrato={contrato.uuid}
              />
            </CoadAccordion>
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
