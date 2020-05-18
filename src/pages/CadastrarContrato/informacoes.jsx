import React, { Component } from "react";
import $ from "jquery";
import { Field } from "formik";
import {
  Row,
  Col,
  Card,
  Label,
  FormGroup,
  Input as InputBootstrap,
  Button,
  Input
} from "reactstrap";
import {
  CoadTextInput,
  CoadRadio,
  CoadEditor,
  CoadCalendar,
  CoadSelect
} from "../../components/Contratos/CoadForm";
import { getTiposServicoLookup } from "../../service/TiposServico.service";
import {
  getEstadosContrato,
  getSituacoesContrato
} from "../../service/Contratos.service";
import { getEmpresasLookup } from "../../service/Empresas.service";
import DotacaoOrcamentaria from "./DotacaoOrcamentaria";
import moment from "moment";
import { REFERENCIA_ENCERRAMENTO } from "../../configs/config.constants";

const { DATA_ASSINATURA, DATA_ORDEM_INICIO } = REFERENCIA_ENCERRAMENTO;

const referenciaEncerramentoOptions = [
  {label:'Data da assinatura', value: DATA_ASSINATURA},
  {label:'Data da ordem de início', value: DATA_ORDEM_INICIO}
]
export default class Informacoes extends Component {
  state = {
    situacao: [],
    estado: [],
    data_assinatura: null,
    data_ordem_inicio: null,
    empresa_contratada: null,
    observacoes: null,
    tipoServicos: [],
    empresas: [],
    cnpjEmpresa: null,
    dataEncerramento: null,
  };

  async componentDidMount() {
    const contrato = this.props.contrato;
    const tipoServicos = await getTiposServicoLookup();
    const estado = await getEstadosContrato();
    const situacao = await getSituacoesContrato();
    const empresas = await getEmpresasLookup();
    this.setState({
      tipoServicos,
      estado,
      situacao,
      empresas,
      dataEncerramento: contrato.data_encerramento
        ? moment(contrato.data_encerramento).format("DD/MM/YYYY")
        : null,
      cnpjEmpresa: contrato.empresa_contratada ? contrato.empresa_contratada.cnpj : null
    });
    $("#avancar-1").click(e => {
      const situacaoRadio = $("[name=situacao]:checked").val();
      e.preventDefault();
      let error = 0;
      if (!$("#tipo_servico").val() && situacaoRadio !== "RASCUNHO") {
        $("#tipo_servico").addClass("is-invalid");
        error++;
      }

      if (!$("[name=processo]").val() && situacaoRadio !== "RASCUNHO") {
        $("[name=processo]").addClass("is-invalid");
        error++;
      }

      if (
        !$("[name=empresa_contratada]").val() &&
        situacaoRadio !== "RASCUNHO"
      ) {
        $("[name=empresa_contratada]").addClass("is-invalid");
        error++;
      }

      if (!$("[name=vigencia_em_dias]").val() && situacaoRadio !== "RASCUNHO") {
        $("[name=vigencia_em_dias]").addClass("is-invalid");
        error++;
      }

      if (!$("[name=data_assinatura]").val() && situacaoRadio !== "RASCUNHO") {
        $("[name=data_assinatura]").css("border-color", "red");
        error++;
      }
      if (
        !$("[name=data_ordem_inicio]").val() &&
        situacaoRadio !== "RASCUNHO"
      ) {
        $("[name=data_ordem_inicio]").css("border-color", "red");
        error++;
      }

      if (error === 0) {
        this.props.jumpToStep(1);
      } else {
        $(".alerta").removeClass("d-none");
      }
    });

    $("#vigencia_em_dias").change(() => {
      let dataAssinatura = $("[name=data_assinatura]").val();
      const vigenciaContrato = $("#vigencia_em_dias").val();
      this.calculaEncerramento(dataAssinatura, vigenciaContrato);
    });

    $("[name=data_assinatura]").on("blur", () => {
      let dataAssinatura = $("[name=data_assinatura]").val();
      const vigenciaContrato = $("#vigencia_em_dias").val();
      this.calculaEncerramento(dataAssinatura, vigenciaContrato);
    });
  }

  calculaEncerramento = (data, dias) => {
    const novaData = moment(data, "DD/MM/YYYY")
      .add(dias, "days")
      .calendar();

    this.setState({dataEncerramento: moment(novaData).format('DD/MM/YYYY')})
  };

  cancelar = () => {
    this.props.cancelar();
    this.props.jumpToStep(0);
  };

  SelecionaEmpresa = event => {
    const { empresas } = this.state;
    const value = event.target.value;
    if (empresas)
      empresas.forEach(empresa => {
        if (empresa.uuid === value) {
          this.setState({ cnpjEmpresa: empresa.cnpj });
        }
      });
  };

  render() {
    const {
      tipoServicos,
      estado,
      situacao,
      empresas,
      cnpjEmpresa, 
      dataEncerramento
    } = this.state;
    return (
      <>
        <strong>
          <i className="fas fa-lg fa-file-signature" /> Informações
          Contrato/Empresa
        </strong>
        <Card className="mt-3">
          <Row>
            <Col lg={4} xl={4}>
              <CoadTextInput
                name="termo_contrato"
                id="termo_contrato"
                label="Número Termo de Contrato"
                placeholder="Ex: 00/00"
                disabled={true}
              />
            </Col>
            <Col lg={8} xl={8}>
              <CoadSelect
                label="Tipo de Serviço"
                name="tipo_servico"
                id="tipo_servico"
              >
                <option value="">Selecione</option>
                {tipoServicos
                  ? tipoServicos.map((value, i) => {
                      return (
                        <option key={i} value={value.uuid}>
                          {value.nome}
                        </option>
                      );
                    })
                  : ""}
              </CoadSelect>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xl={4}>
              <CoadTextInput
                label="Número do Processo"
                name="processo"
                id="processo"
                placeholder="Ex: 0000000000000"
                type="text"
              />
            </Col>
            <Col lg={8} xl={8}>
              <Label className="pb-2">Estado Contrato</Label>
              <br />
              {estado.map((value, i) => (
                <CoadRadio
                  type="radio"
                  name="estado_contrato"
                  value={value.id}
                  label={value.nome}
                  key={i}
                />
              ))}
            </Col>
          </Row>

          <Row>
            <Col lg={4} xl={4}>
              <CoadTextInput
                label="Número do Edital"
                name="numero_edital"
                id="numero_edital"
                placeholder="Ex: 0000000000000"
                type="text"
              />
            </Col>
            <Col lg={8} xl={8}>
              <Label className="pb-2">Situação de Contrato</Label>
              <br />
              {situacao.map((value, i) => {
                let desabilitar = false;
                if (this.props.cancelamento) {
                  desabilitar = value.id === "RASCUNHO" ? true : false;
                }

                return (
                  <CoadRadio
                    label={value.nome}
                    name="situacao"
                    type="radio"
                    value={value.id}
                    key={i}
                    disabled={desabilitar}
                  />
                );
              })}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg={4} xl={4}>
              <Field
                component={CoadCalendar}
                name="data_assinatura"
                id="data_assinatura"
                label="Data Assinatura de Contrato"
              />
            </Col>
            <Col lg={3} xl={3}>
              <Field
                component={CoadCalendar}
                name="data_ordem_inicio"
                id="data_ordem_inicio"
                label="Data Ordem de Início"
              />
            </Col>
            <Col lg={5} xl={5}>
            <CoadSelect
                label="Referência para cálculo do encerramento"
                name="referencia_encerramento"
                onBlur={value => {}}
              >
                <option value="">Selecione</option>
                {empresas
                  ? referenciaEncerramentoOptions.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })
                  : ""}
              </CoadSelect>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} xl={4}>
              <CoadTextInput
                name="vigencia_em_dias"
                label="Vigência de Contrato"
                type="text"
                id="vigencia_em_dias"
                placeholder="Ex: 365 dias"
              />
            </Col>
            <Col lg={8} xl={8}>
              <Label>Data Encerramento de Contrato</Label>
              <Input
                label="Data Encerramento de Contrato"
                id="data_encerramento"
                name="data_encerramento"
                disabled={true}
                value={dataEncerramento}
                placeholder={"01/01/2030"}
              />
            </Col>
          </Row>
        </Card>
        <Card>
          <strong className="mb-3">Empresa Contratada</strong>
          <Row>
            <Col lg={12} xl={12}>
              <CoadSelect
                label="Empresa Contratada"
                name="empresa_contratada"
                onBlur={value => this.SelecionaEmpresa(value)}
              >
                <option value="">Selecione</option>
                {empresas
                  ? empresas.map((empresa, i) => {
                      return (
                        <option key={i} value={empresa.uuid}>
                          {empresa.nome}
                        </option>
                      );
                    })
                  : ""}
              </CoadSelect>
            </Col>
          </Row>
          <Row>
            <Col lg={12} xl={12}>
              <FormGroup>
                <Label>CNPJ Empresa</Label>
                <InputBootstrap value={cnpjEmpresa} disabled={true} />
              </FormGroup>
            </Col>
          </Row>
        </Card>
        <Card>
          <DotacaoOrcamentaria
            dotacao={this.props.dotacao}
            getDotacao={value => this.props.getDotacao(value)}
          />
        </Card>
        <Card>
          <strong className="mb-3">Objeto de Contrato</strong>
          <Row>
            <Col lg={12} xl={12}>
              <Field
                component={CoadEditor}
                name="objeto"
                id="objeto"
                style={{ height: "320px" }}
                label="Objeto de Contrato"
              />
            </Col>
          </Row>
        </Card>
        <div className="alerta text-center alert alert-danger d-none">
          <strong>Para avançar, preencha os campos obrigatórios</strong>
        </div>
        <div className="d-flex flex-row-reverse mt-4">
          <Button id="avancar-1" type="button" className="btn-coad-primary">
            Avançar
          </Button>
          <Button
            type="button"
            onClick={() => this.cancelar()}
            className="btn-coad-background-outline mx-3"
            disabled={this.props.cancelamento}
          >
            Cancelar
          </Button>
          <br />
        </div>
      </>
    );
  }
}
