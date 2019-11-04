import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import CardSuperior from "./CardSuperior";
import CoadAccordion from "../../components/Global/CoadAccordion";
import { Button, Col, Row, FormGroup, Label, Card } from "reactstrap";
import InformacoesOrcamentaria from "./InformacoesOrcamentaria";
import { Editor } from "primereact/editor";
import UnidadeEnvolvidas from "./UnidadesEnvolvidas";
import Anexos from "./Anexos";
import {
  getContratoByUUID,
  getEstadosContrato
} from "../../service/Contratos.service";
import { getUrlParams } from "../../utils/params";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { SelecionaTipoServico } from "../../components/Contratos/SelecionaTipoServico";
import { CALENDAR_PT } from "../../configs/config.constants";
import SituacaoRadio from "../../components/Contratos/SelecionaSituacaoContrato/SituacaoRadio";
import EstadoRadio from "../../components/Contratos/SelecionaEstadoContrato/EstadoRadio";
import { formatadorDeData, formatadoMonetario } from "../../utils/formatador";
import { SelecionaEmpresa } from "../../components/Contratos/SelecionaEmpresa";
import SelecionarDivisoes from "../../components/Contratos/SelecionarDivisoes";
import SelecionarNucleos from "../../components/Contratos/SelecionarNucleos";
import { BuscaIncrementalServidores } from "../../components/Contratos/BuscaIncrementalServidores";
import { getUnidadeContrato } from "../../service/UnidadeContrato.service copy";

class VisualizarContratos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contrato: {},
      termo_contrato: null,
      tipo_servico: null,
      data_ordem_inicio: null,
      situacao: null,
      empresa_contratada: {},
      objeto: "",
      observacoes: "",
      estadoContrato: [],
      situacaoContrato: [],
      divisao: null,
      gestor: null,
      nucleo: null,
      estado: null,
      unidades: [],

      tipoServico: null,
      nomeEmpresa: null
    };

    this.selecionaTipoServico = this.selecionaTipoServico.bind(this);
    this.selecionarSituacao = this.selecionarSituacao.bind(this);
  }

  async componentDidMount() {
    const param = getUrlParams();
    const contrato = await getContratoByUUID(param.uuid);
    const estadoContrato = await getEstadosContrato();
    const unidadeContrato = await getUnidadeContrato(param.uuid);

    this.setState({ contrato, estadoContrato, unidades: unidadeContrato });
    this.propsToState(contrato);
  }

  propsToState = contrato => {
    this.setState({
      tipoServico: contrato.tipo_servico.nome,
      nomeEmpresa: contrato.empresa_contratada.nome,
      termo_contrato: contrato.termo_contrato,
      tipo_servico: contrato.tipo_servico,
      situacao: contrato.situacao,
      data_ordem_inicio: formatadorDeData(contrato.data_ordem_inicio),
      data_encerramento: formatadorDeData(contrato.data_encerramento),
      processo: contrato.processo,
      empresa_contratada: contrato.empresa_contratada,
      total_mensal: contrato.total_mensal,
      objeto: contrato.objeto,
      observacoes: contrato.observacoes,
      divisao: contrato.nucleo_responsavel.divisao.uuid,
      gestor: contrato.gestor,
      nucleo: contrato.nucleo_responsavel.uuid,
      estado: contrato.estado_contrato
    });
  };

  selecionaTipoServico = value => {
    this.setState({ tipo_servico: value });
  };

  SelecionarEmpresa = value => {
    this.setState({
      empresa_contratada: value
    });
  };

  selecionarSituacao = value => {
    this.setState({ situacao: value });
  };

  selecionarDivisao = value => {
    this.setState({ divisao: value });
  };

  selecionarNucleo = value => {
    this.setState({ nucleo: value });
  };

  selecionaGestor = gestor => {
    this.setState({ gestor });
  };

  selecionarEstado = estado => {
    this.setState({ estado });
  };

  handleSubmit = () => {
    // e.preventDefault();
    console.log(this.state);
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
      data_encerramento,
      empresa_contratada,
      total_mensal,
      objeto,
      observacoes,
      divisao,
      gestor,
      nucleo,
      estado,
      unidades
    } = this.state;
    console.log(contrato);
    return (
      <Page
        titulo={`Termo de Contrato n. ${contrato.termo_contrato} - ${nomeEmpresa}`}
      >
        <CardSuperior
          tipoServico={tipoServico}
          situacaoContratual={contrato.estado_contrato}
          estadoContrato={contrato.situacao}
          totalmensal={contrato.total_mensal}
          dataEncerramento={contrato.data_encerramento}
          diasEncerramento={contrato.dias_para_o_encerramento}
        />
        <Container>
          {/* <Form onSubmit={handleSubmit}> */}
          <Row>
            <Col lg={10}>
              <h2>
                <i className="fas fa-file-signature"></i> Visualizar/Alterar
                contrato
              </h2>
            </Col>
            <Col lg={2}>
              <Button disabled className="btn btn-coad-primary float-right">
                Editar
              </Button>
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
                <Label form="tipoServico">Tipo de Serviço</Label>
                <br />
                <SelecionaTipoServico
                  onSelect={value => this.selecionaTipoServico(value)}
                  id="tipoServico"
                  className="w-100"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <FormGroup>
                  <Label form="numeroProcesso">Número de Processo</Label>
                  <InputText
                    id="numeroProcesso"
                    value={processo}
                    onChange={e => this.setState({ processo: e.target.value })}
                    placeholder={"Ex: 0000.2019/0000000-0"}
                    className="w-100"
                    readOnly={true}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                <Label form="situacao">Situação de Contrato</Label>
                <br />
                <SituacaoRadio
                  checado={situacao}
                  onSelect={value => this.selecionarSituacao(value)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <Label for="edital">Número do Edital</Label>
                <InputText
                  id="edital"
                  value={""}
                  disabled
                  placeholder={"Ex: 00000000"}
                  className="w-100"
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                <Label form="estado">Estado de Contrato</Label>
                <br />
                <EstadoRadio
                  onSelect={this.selecionarEstado}
                  checado={estado}
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
                      value={contrato.data_assinatura}
                      onChange={e =>
                        this.setState({ data_assinatura: e.value })
                      }
                      locale={CALENDAR_PT}
                      dateFormat="dd/mm/yy"
                      showIcon={true}
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
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} xs={12} md={12} lg={6} xl={6}>
                    <FormGroup>
                      <Label for="vigencia">Vigência de Contrato</Label>
                      <InputText
                        id="vigencia"
                        value={contrato.vigencia_em_dias}
                        onChange={e =>
                          this.setState({ vigencia_em_dias: e.target.value })
                        }
                        placeholder={"Ex: 365 dias"}
                        className="w-100"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={12} xs={12} md={12} lg={6} xl={6}>
                    <Label>Data Encerramento de Contrato</Label>
                    <br />
                    <Calendar
                      value={data_encerramento}
                      onChange={e =>
                        this.setState({ data_encerramento: e.value })
                      }
                      showIcon={true}
                      locale={CALENDAR_PT}
                      dateFormat="dd/mm/yy"
                    />
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
                  <Col>
                    <FormGroup className="p-grid p-fluid">
                      <Label>Nome Empresa</Label>
                      <br />
                      <SelecionaEmpresa
                        onSelect={value => this.SelecionarEmpresa(value)}
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
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col>
                <button className="btn coad-color font-weight-bold">
                  Nova empresa
                </button>
              </Col>
            </Row>
          </CoadAccordion>
          <CoadAccordion titulo={"Informações Orçamentárias de Contrato"}>
            <InformacoesOrcamentaria totalMensal={total_mensal} />
          </CoadAccordion>
          <CoadAccordion titulo={"Objeto de Contrato"}>
            <Editor
              style={{ height: "320px" }}
              value={objeto}
              onTextChange={e => this.setState({ objeto: e.htmlValue })}
            />
          </CoadAccordion>
          <CoadAccordion titulo={"Gestão de Contrato"}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                <FormGroup>
                  <Label form="coordenador">Coordenador COAD</Label>
                  <InputText
                    id="coordenador"
                    value={"Teste"}
                    className="w-100"
                    disabled={true}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <SelecionarDivisoes
                  selected={divisao}
                  onSelect={this.selecionarDivisao}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                <FormGroup className="p-grid p-fluid">
                  <Label form="gestor">Gestor do Contrato</Label>
                  <br />
                  {/* <InputText id="gestor" value={gestor ? gestor.nome : ''} className="w-100" /> */}
                  <BuscaIncrementalServidores
                    placeholder={"Selecione o gestor do contrato"}
                    onUpdate={this.selecionaGestor}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                <SelecionarNucleos
                  selected={nucleo}
                  onSelect={this.selecionarNucleo}
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
              onTextChange={e => this.setState({ observacoes: e.htmlValue })}
            />
          </CoadAccordion>
          <CoadAccordion titulo={"Unidade Envolvidas"}>
            <UnidadeEnvolvidas unidadesContrato={unidades} />
          </CoadAccordion>
          <CoadAccordion titulo={"Anexos"}>
            <Anexos />
          </CoadAccordion>
          <Row>
            <Col lg={12}>
              <div className="float-right">
                <Button
                  type="button"
                  className="btn-coad-background-outline mt-3 mb-2"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => this.handleSubmit()}
                  className="btn btn-coad-primary mt-3 ml-2 mb-2"
                >
                  Aplicar
                </Button>
              </div>
            </Col>
          </Row>
          {/* </Form> */}
        </Container>
      </Page>
    );
  }
}

export default VisualizarContratos;